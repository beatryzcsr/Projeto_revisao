const pool = require('../config/database');

async function buscarPorEmail(email) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

async function criar({ email, senhaHash }) {
  const result = await pool.query(
    'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email',
    [email, senhaHash]
  );
  return result.rows[0];
}

module.exports = {
  buscarPorEmail,
  criar,
};
