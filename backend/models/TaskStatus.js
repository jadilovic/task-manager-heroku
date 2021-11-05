const mongoose = require('mongoose');

const TaskStatusSchema = mongoose.Schema(
	{
		message: {
			type: String,
			required: [true, 'Please enter task status message'],
			minlength: [10, 'Task status message must be minimum 10 characters long'],
			maxlength: [50, 'Task status message can be maximum 50 characters long'],
		},
		// change severity
		severity: {
			type: String,
			required: [true, 'Please message severity'],
			minlength: [3, 'Message severity must be minimum 3 characters long'],
			maxlength: [15, 'Message severity can be maximum 15 characters long'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskStatusSchema);
