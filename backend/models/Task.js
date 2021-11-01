const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter task name'],
			minlength: 3,
			maxlength: 50,
		},
		dateCreated: {
			type: Date,
			default: Date.now(),
		},
		currentStatus: {
			type: Number,
			default: 1,
		},
		description: {
			type: String,
			default: '',
			maxlength: 200,
		},
		avatarColor: {
			type: String,
			default: '#00FF00',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please enter user'],
		},
	},
	{ timestamps: true }
);

TaskSchema.pre('save', function (next) {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	this.avatarColor = color;
	next();
});

module.exports = mongoose.model('Task', TaskSchema);
