const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  let retries = 10;

  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conectado ao banco com sucesso!');

      await sequelize.sync({ alter: true });
      console.log('📂 Modelos sincronizados com o banco.');
      return;
    } catch (error) {
      console.log(`⏳ Aguardando banco ficar pronto... (${retries} tentativas restantes)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  console.error('❌ Não foi possível conectar ao banco após várias tentativas.');
  process.exit(1);
};

module.exports = { sequelize, connectDB };
