const Project = require('../models/projectModel');
const User = require('../models/userModel');

exports.createProject = async (req, res) => {
  try {
    const { name, description, user_id } = req.body;
    const project = await Project.create({ name, description, user_id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Projeto deletado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
};