const express = require('express');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

connectDB().then(() => {
  console.log('Servidor pronto para usar os models');

  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`🚀 Server rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('❌ Falha ao iniciar o servidor:', error);
});
