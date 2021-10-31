const express = require('express');
const router = express.Router();

const {
	getAllTasks,
	getTask,
	deleteTask,
	createTask,
	updateTask,
} = require('../controllers/tasks');

router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
