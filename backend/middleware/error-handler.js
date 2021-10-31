const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
	const customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};
	/*
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
*/
	// Models input validation errors
	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(', ');
		customError.statusCode = 400;
	}

	if (err.code && err.code === 11000) {
		customError.statusCode = 400;
		customError.msg = `Duplicate value entered for the task ${Object.keys(
			err.keyValue
		)} please enter new value`;
	}

	if (err.name === 'CastError') {
		customError.msg = `No item found with id ${err.value}`;
		customError.statusCode = 404;
	}
	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
