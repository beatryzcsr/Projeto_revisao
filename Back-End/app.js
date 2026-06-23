
// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./src/config/database');
const produtosRoutes = require('./src/routes/produtoRoutes');
const authRoutes = require('./src/routes/authRoutes');
 
app.use(express.static('./public'));
app.use(cors());
app.use(express.json());
 
// Rota de autenticação (registro / login)
app.use('/api/auth', authRoutes);
 
// Rotas de produtos protegidas por JWT
app.use('/produtos', produtosRoutes);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
