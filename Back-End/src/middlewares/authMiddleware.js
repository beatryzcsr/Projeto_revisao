const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'troca_por_uma_chave_forte';

// ==================== SETUP ====================
// Garantir que as tabelas existem
async function ensureTablesExist() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabela "tokens" verificada/criada');
  } catch (e) {
    console.error('❌ Erro criando tabela tokens:', e.message || e);
  }
}

// ==================== MIDDLEWARE AUTENTICAÇÃO ====================
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar se o token existe na tabela tokens
    const resultado = await pool.query(
      'SELECT * FROM tokens WHERE token = $1',
      [token]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

// ==================== FUNÇÕES DEBUG ====================
async function listarUsuarios() {
  try {
    const res = await pool.query("SELECT idu AS id, email, senha FROM usuarios ORDER BY idu");
    return res.rows.map(u => ({
      ...u,
      senhaPreview: u.senha ? u.senha.slice(0, 10) + '...' : null
    }));
  } catch (e) {
    console.error('❌ Erro listar usuários:', e.message || e);
    return [];
  }
}

async function listarTokens() {
  try {
    const res = await pool.query(
      'SELECT id, usuario_id, token, criado_em FROM tokens ORDER BY id DESC LIMIT 10'
    );
    return res.rows.map(r => ({
      id: r.id,
      usuario_id: r.usuario_id,
      tokenPreview: r.token.slice(0, 10) + '...',
      criado_em: r.criado_em
    }));
  } catch (e) {
    console.error('❌ Erro listar tokens:', e.message || e);
    return [];
  }
}

async function inserirTokenTeste(usuarioId, token) {
  try {
    await pool.query(
      'INSERT INTO tokens (usuario_id, token) VALUES ($1, $2)',
      [usuarioId, token]
    );
    console.log(`✅ Token inserido para usuário ${usuarioId}`);
    return true;
  } catch (e) {
    console.error('❌ Erro inserir token:', e.message || e);
    return false;
  }
}

module.exports = authMiddleware;
module.exports.ensureTablesExist = ensureTablesExist;
module.exports.listarUsuarios = listarUsuarios;
module.exports.listarTokens = listarTokens;
module.exports.inserirTokenTeste = inserirTokenTeste;
