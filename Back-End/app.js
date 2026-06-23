
// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./src/config/database');
const produtosRoutes = require('./src/routes/produtoRoutes');  
 
// Middleware para servir os arquivos estáticos do front-end 
app.use(express.static('./public')); 
 
// Middleware CORS para aceitar requisições do frontend
app.use(cors()); 
 
// Middleware para interpretar JSON no corpo das requisições 
app.use(express.json()); 
 
// Aplica as rotas de cliente com o prefixo '/clientes' 
// O caminho '/' no clientesRoutes.js se torna '/clientes' aqui. 
app.use('/produtos', produtosRoutes);  
 
// Inicia o servidor na porta 3000 
app.listen(3000, () => { 
    console.log('Servidor rodando em http://localhost:3000'); 
});
