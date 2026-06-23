const pool = require('../src/config/database');

async function list() {
  try {
    const res = await pool.query('SELECT id, usuario_id, token, criado_em FROM tokens ORDER BY id DESC LIMIT 10');
    console.log('Tokens:', res.rows.map(r => ({id:r.id, usuario_id:r.usuario_id, tokenPreview: r.token.slice(0,10)+'...'})) );
  } catch (e) {
    console.error('Erro listar tokens:', e.message || e);
  } finally {
    pool.end();
  }
}

list();
