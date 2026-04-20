import customError from './custom-error.js';

class unauthorizedError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
export default unauthorizedError;
