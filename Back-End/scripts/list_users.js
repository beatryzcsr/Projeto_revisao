const pool = require('../src/config/database');

async function list() {
  try {
    const res = await pool.query("SELECT idu AS id, email, senha FROM usuarios ORDER BY idu");
    console.log('Usuarios:', res.rows.map(u => ({...u, senhaPreview: u.senha ? u.senha.slice(0,10) : null}))); 
  } catch (e) {
    console.error('Erro listar usuarios:', e.message || e);
  } finally {
    pool.end();
  }
}

list();
