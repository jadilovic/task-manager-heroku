const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllTasks = async (req, res) => {
	const tasks = await Task.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ tasks, length: tasks.length });
};

const createTask = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const task = await Task.create(req.body);
	res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req;
	if (company === '' || position === '') {
		throw BadRequestError('Must provide company and position value');
	}
	const job = await Job.findByIdAndUpdate(
		{ _id: jobId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!job) {
		throw NotFoundError(`Job with id ${jobId} was not found`);
	}
	res.status(StatusCodes.OK).json({ job });
};

const getTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req;
	const job = await Job.findOne({ _id: jobId, createdBy: userId });
	if (!job) {
		throw new NotFoundError(`No job found with id ${jobId}`);
	}
	res.status(StatusCodes.OK).json({ job });
};

const deleteTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req;
	const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
	if (!job) {
		throw new NotFoundError(`No job found with id ${jobId}`);
	}
	res.status(StatusCodes.OK).json({ job });
};

module.exports = { getAllTasks, createTask, updateTask, getTask, deleteTask };
