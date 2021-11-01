const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllTasks = async (req, res) => {
	const tasks = await Task.find({ createdBy: req.user.userId });
	// explore mongo sort reverse mongoose
	res.status(StatusCodes.OK).json({ tasks, length: tasks.length });
};

const createTask = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const task = await Task.create(req.body);
	res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
	const {
		body: { name, currentStatus, description },
		user: { userId },
		params: { id: taskId },
	} = req;
	if (name === '') {
		throw BadRequestError('Must provide task name value');
	}
	const task = await Task.findByIdAndUpdate(
		{ _id: taskId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!task) {
		throw NotFoundError(`Task with id ${taskId} was not found`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const getTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: taskId },
	} = req;
	const task = await Task.findOne({ _id: taskId, createdBy: userId });
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

module.exports = { getAllTasks, createTask, updateTask, getTask, deleteTask };
