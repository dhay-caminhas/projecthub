const express = require('express');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000; 
  app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));
};

startServer();