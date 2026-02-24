const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'projects',
  timestamps: true
});

Project.associate = (models) => {
  Project.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  Project.hasMany(models.Task, { foreignKey: 'project_id' });
};

module.exports = Project;