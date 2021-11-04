const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
	// set default
	console.log('ERRROOOORRR', err);
	const customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map((item) => `${item.path}-${item.message}`)
			.join(', ');
		customError.msg = `ValidationError: ${customError.msg}`;
		customError.statusCode = 400;
	}

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

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
