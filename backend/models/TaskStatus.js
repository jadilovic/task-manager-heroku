const mongoose = require('mongoose');

const TaskStatusSchema = mongoose.Schema(
	{
		message: {
			type: String,
			required: [true, 'Please enter task status message'],
			minlength: [7, 'Task status message must be minimum 10 characters long'],
			maxlength: [50, 'Task status message can be maximum 50 characters long'],
		},

		colorNotification: {
			type: String,
			required: [true, 'Please message color notification'],
			minlength: [
				3,
				'Message color notification must be minimum 3 characters long',
			],
			maxlength: [
				15,
				'Message color notification can be maximum 15 characters long',
			],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('TaskStatus', TaskStatusSchema);
