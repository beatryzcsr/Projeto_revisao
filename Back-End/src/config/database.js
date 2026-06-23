
// Importar dotenv e carregar variáveis do arquivo .env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Importar o Pool do PostgreSQL
const { Pool } = require('pg');

//pool de conexões com .env
const pool = new Pool({
  // process.env.NOME_VARIAVEL busca no arquivo .env
  user: process.env.DB_USER,           // Lê DB_USER do .env
  host: process.env.DB_HOST,           // Lê DB_HOST do .env
  database: process.env.DB_NAME,       // Lê DB_NAME do .env
  password: process.env.DB_PASSWORD,   // Lê DB_PASSWORD do .env
  port: parseInt(process.env.DB_PORT), // Lê DB_PORT e converte para número
});


// TESTAR CONEXÃO


pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();  // Devolver a conexão ao pool
  }
});


// EXPORTAR O POOL

// Wrap query to log SQL and parameters for debugging
const originalQuery = pool.query.bind(pool);
pool.query = (...args) => {
  try {
    const sql = args[0];
    const params = args[1] || [];
    console.log('SQL:', typeof sql === 'string' ? sql.replace(/\s+/g,' ') : sql, 'PARAMS:', params);
  } catch (e) {
    console.error('Erro ao logar query', e);
  }
  return originalQuery(...args);
};

module.exports = pool;
