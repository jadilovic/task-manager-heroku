const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const TaskStatus = require('../models/TaskStatus');

const getAllTasks = async (req, res) => {
	const tasks = await Task.find({ createdBy: req.user.userId }).sort({
		createdAt: -1,
	});
	res.status(StatusCodes.OK).json({ tasks, length: tasks.length });
};

const taskNameExists = async (enteredTaskName, userId, taskId) => {
	const taskObject = await Task.find({ createdBy: userId }).findOne({
		name: enteredTaskName,
	});
	if (taskObject) {
		return taskObject._id.toString() === taskId ? false : true;
	} else {
		return false;
	}
};

const createTask = async (req, res) => {
	const existingTask = await taskNameExists(
		req.body.newTask.name,
		req.user.userId
	);
	if (existingTask) {
		throw new BadRequestError(
			'Entered task name already exists. Please enter different task name.'
		);
	}
	req.body.newTask.createdBy = req.user.userId;
	req.body.newTask.currentStatus = req.body.newTask.statusId;
	const task = await Task.create(req.body.newTask);
	res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
	const {
		body: { name },
		user: { userId },
		params: { id: taskId },
	} = req;
	if (name === '') {
		throw new BadRequestError('Must provide task name value');
	}
	const existingTask = await taskNameExists(name, userId, taskId);
	if (existingTask) {
		throw new BadRequestError(
			'Entered task name already exists. Please enter different task name.'
		);
	}
	const task = await Task.findByIdAndUpdate(
		{ _id: taskId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!task) {
		throw new NotFoundError(`Task with id ${taskId} was not found`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const getTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: taskId },
	} = req;
	const task = await Task.findOne(
		{ _id: taskId, createdBy: userId },
		{
			currentStatus: 1,
			name: 1,
			description: 1,
			updatedAt: 1,
			avatarIcon: 1,
			avatarColor: 1,
		}
	);
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: taskId },
	} = req;
	const task = await Task.findByIdAndRemove({ _id: taskId, createdBy: userId });
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const createTaskStatus = async (req, res) => {
	const taskStatus = await TaskStatus.create(req.body);
	res.status(StatusCodes.CREATED).json({ taskStatus });
};

const getAllStatuses = async (req, res) => {
	const statuses = await TaskStatus.find({});
	res.status(StatusCodes.OK).json({ statuses, length: statuses.length });
};

const filterTasksByAvatarIconAndColor = async (req, res) => {
	console.log('test', req.body);
	const {
		user: { userId },
	} = req;
	const filteredTasks = await Task.find(
		{
			$and: [
				{
					$or: [
						{
							avatarIcon: 'Home',
						},
						{
							avatarIcon: 'Business',
						},
					],
				},
				{
					$or: [
						{
							avatarColor: 'Umber',
						},
						{
							avatarColor: 'Vegas Gold',
						},
					],
				},
			],
			createdBy: userId,
		},
		{
			currentStatus: 1,
			name: 1,
			description: 1,
			updatedAt: 1,
			createdAt: 1,
			avatarIcon: 1,
			avatarColor: 1,
		}
	);
	if (!filteredTasks) {
		throw new NotFoundError(`No task found with given filters`);
	}
	res.status(StatusCodes.OK).json({ filteredTasks });
};

module.exports = {
	getAllTasks,
	createTask,
	updateTask,
	getTask,
	deleteTask,
	createTaskStatus,
	getAllStatuses,
	filterTasksByAvatarIconAndColor,
};
