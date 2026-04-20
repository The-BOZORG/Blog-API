const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };

  // Validation error
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  // Duplicate error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  // Cast error
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

  // Syntax error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    customError.msg = 'Invalid JSON format';
    customError.statusCode = 400;
  }

  const response = { msg: customError.msg };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(customError.statusCode).json(response);
};

export default errorHandler;
