import { logger } from '../lib/winstone.js';

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };

  // validation error
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  // cast error
  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    customError.msg = 'Invalid token, please login again';
    customError.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    customError.msg = 'Token expired, please login again';
    customError.statusCode = 401;
  }

  // syntax error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    customError.msg = 'Invalid JSON format';
    customError.statusCode = 400;
  }

  logger.error('unhandled error occurred', {
    message: err.message,
    stack: err.stack,
    statusCode: customError.statusCode,
    path: req.originalUrl,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  const response = { msg: customError.msg };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(customError.statusCode).json(response);
};

export default errorHandler;
