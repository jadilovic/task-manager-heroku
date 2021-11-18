const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter task name'],
			minlength: [3, 'Task name must be minimum 3 characters long'],
			maxlength: [50, 'Task name can be maximum 50 characters long'],
		},
		dateCreated: {
			type: Date,
			default: Date.now(),
		},
		currentStatus: {
			type: mongoose.Types.ObjectId,
			ref: 'TaskStatus',
			required: [true, 'Please enter task status'],
		},
		description: {
			type: String,
			default: '',
			maxlength: [200, 'Description can be maximum 200 characters long'],
		},
		avatarColor: {
			type: String,
			required: [true, 'Please enter avatar color'],
		},
		avatarIcon: {
			type: String,
			required: [true, 'Please enter avatar icon name'],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please enter user'],
		},
	},
	{ timestamps: true }
);

// TaskSchema.pre('save', function (next) {
// 	let letters = '0123456789ABCDEF';
// 	let color = '#';
// 	for (var i = 0; i < 6; i++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	this.avatarColor = color;
// 	next();
// });

module.exports = mongoose.model('Task', TaskSchema);
