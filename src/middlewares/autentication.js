import { verifyAccessToken } from '../lib/jwt.js';
import asyncHandler from './asyncHandler.js';
import authenticatedError from '../errors/unauthenticated.js';

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new authenticatedError('access token required', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    throw new authenticatedError('invalid or expired access token', 401);
  }
});
export default authenticate;
