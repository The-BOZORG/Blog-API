import customError from './custom-error.js';

class badRequestError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default badRequestError;
