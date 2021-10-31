const mongoose = require('mongoose');

const getAvatarColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const TaskSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter task name'],
			minlength: 3,
			maxlength: 50,
			unique: true,
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
			default: getAvatarColor(),
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please enter user'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
