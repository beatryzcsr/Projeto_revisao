const pool = require('../src/config/database');

async function ensure() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('tokens table ensured');
  } catch (e) {
    console.error('Erro criando tabela tokens:', e.message || e);
  } finally {
    pool.end();
  }
}

ensure();
