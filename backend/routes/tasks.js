const express = require('express');
const router = express.Router();

const {
	getAllTasks,
	getTask,
	deleteTask,
	createTask,
	updateTask,
	createTaskStatus,
	getAllStatuses,
	filterTasksByAvatarIconAndColor,
} = require('../controllers/tasks');

router.route('/status').post(createTaskStatus).get(getAllStatuses);
router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
router.route('/filters').post(filterTasksByAvatarIconAndColor);

module.exports = router;
