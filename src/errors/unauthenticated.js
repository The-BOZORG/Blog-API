import customError from './custom-error';

class authenticatedError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
export default authenticatedError;
