import customError from './custom-error';

class notFoundError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
export default notFoundError;
