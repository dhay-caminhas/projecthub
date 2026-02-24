const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

router.post('/:projectId/tasks', auth, taskController.createTask);
router.get('/:projectId/tasks', auth, taskController.getTasksByProject);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
