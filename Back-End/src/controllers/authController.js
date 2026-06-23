const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'troca_por_uma_chave_forte';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const pool = require('../config/database');

async function register(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    const usuarioExistente = await UserModel.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await UserModel.criar({ email, senhaHash });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso.',
      usuario: { id: novoUsuario.id, email: novoUsuario.email },
    });
  } catch (erro) {
    console.error('Register error:', erro);
    res.status(500).json({
      mensagem: 'Erro ao registrar usuário.',
      erro: erro.message,
      code: erro.code,
      detail: erro.detail,
      position: erro.position,
      where: erro.where
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await UserModel.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { sub: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Salvar token no banco para permitir revogação/validação adicional
    try {
      const r = await pool.query(
        'INSERT INTO tokens (usuario_id, token) VALUES ($1, $2) RETURNING id',
        [usuario.id, token]
      );
      console.log('Token salvo no DB, id:', r.rows[0] && r.rows[0].id);
    } catch (e) {
      console.error('Erro ao salvar token no banco:', e);
      // não bloquear o login por falha de persistência do token
    }

    res.status(200).json({ token });
  } catch (erro) {
    console.error('Login error:', erro);
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro: erro.message });
  }
}

module.exports = {
  register,
  login,
};
