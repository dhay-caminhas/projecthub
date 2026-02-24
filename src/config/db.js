const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco com sucesso!');
    await sequelize.sync({ alter: true });
    console.log('📂 Modelos sincronizados.');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
};

module.exports = { sequelize, connectDB };