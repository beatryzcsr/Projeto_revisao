const pool = require('../src/config/database');

async function run() {
  try {
    await pool.query('INSERT INTO tokens (usuario_id, token) VALUES ($1, $2)', [6, 'manual_test_token']);
    const res = await pool.query('SELECT count(*) FROM tokens');
    console.log('count', res.rows[0]);
  } catch (e) {
    console.error('insert error', e.message || e);
  } finally {
    pool.end();
  }
}

run();
