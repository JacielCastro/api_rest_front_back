const express = require('express');
const orientacoesRoutes = require('./routes/orientacoesRoutes');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// libera a pasta para ser acessada de qualque lugar
app.use('/uploads', express.static('uploads'));

app.use(express.json());

// Usar as rotas do formulário
app.use('/', orientacoesRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor: http://localhost:3000/');
});
