const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('todo', 'doing', 'done'), defaultValue: 'todo' },
  project_id: { type: DataTypes.INTEGER, allowNull: false },
  assigned_user_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'tasks',
  timestamps: true,
});

Task.associate = (models) => {
  Task.belongsTo(models.Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
  Task.belongsTo(models.User, { foreignKey: 'assigned_user_id', onDelete: 'SET NULL' });
};

module.exports = Task;
