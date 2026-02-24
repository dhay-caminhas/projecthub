const sequelize = require('./db');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco ProjectHub foi bem-sucedida!');
    } catch (error) {
        console.error('Não foi possível conectar:', error.message);
    } finally {
        await sequelize.close();
    }
})();
