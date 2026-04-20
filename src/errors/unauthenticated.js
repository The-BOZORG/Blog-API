import customError from './custom-error.js';

class authenticatedError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
export default authenticatedError;
