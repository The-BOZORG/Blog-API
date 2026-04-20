import customError from './custom-error';

class unauthorizedError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
export default unauthorizedError;
