const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

exports.createTask = async (req, res) => {
    const { projectId } = req.params;
    const { title, assigned_user_id } = req.body;

    try {
        const project = await Project.findOne({ where: { id: projectId, user_id: req.userId } });
        if (!project) return res.status(404).json({ error: "Projeto não encontrado" });

        const task = await Task.create({
            title,
            project_id: projectId,
            assigned_user_id: assigned_user_id || null
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasksByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findOne({ where: { id: projectId, user_id: req.userId } });
        if (!project) return res.status(404).json({ error: "Projeto não encontrado" });

        const tasks = await Task.findAll({ where: { project_id: projectId } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status, assigned_user_id } = req.body;

    try {
        const task = await Task.findByPk(id, { include: Project });
        if (!task || task.Project.user_id !== req.userId)
            return res.status(404).json({ error: "Tarefa não encontrada" });

        task.title = title || task.title;
        task.status = status || task.status;
        task.assigned_user_id = assigned_user_id || task.assigned_user_id;
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id, { include: Project });
        if (!task || task.Project.user_id !== req.userId)
            return res.status(404).json({ error: "Tarefa não encontrada" });

        await task.destroy();
        res.json({ message: "Tarefa deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
