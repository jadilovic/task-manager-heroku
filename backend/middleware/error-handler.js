const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const errorHandlerMiddleware = (err, req, res, next) => {
	// set default
	const customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};
	// console.log('ERRROOOORRR', err);

	if (err.code && err.code === 11000) {
		customError.statusCode = 400;
		customError.msg = `Entered ${Object.keys(
			err.keyValue
		)} already exists, please enter new email address`;
	}

	if (err.name === 'CastError') {
		customError.msg = `No item found with id ${err.value}`;
		customError.statusCode = 404;
	}

	const indentifyErrors = async () => {
		if (err.name === 'ValidationError') {
			customError.msg = Object.values(err.errors)
				.map((item) => `${item.path}-${item.message}`)
				.join(', ');
			customError.msg = `ValidationError: ${customError.msg}`;
			if (req.body.email) {
				try {
					const existingEmail = await User.find(
						{ email: req.body.email },
						{ email: 1 }
					);
					if (existingEmail.length > 0) {
						customError.msg = `${customError.msg}, email-Entered email already exists please enter new email address`;
					}
				} catch (error) {
					console.log('NETWORK ERROR : : : ', error);
				}
			}
			customError.statusCode = 400;
		}
		return res.status(customError.statusCode).json({ msg: customError.msg });
	};
	indentifyErrors();
};

module.exports = errorHandlerMiddleware;
