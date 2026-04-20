import { verifyAccessToken } from '../lib/jwt.js';
import asyncHandler from './asyncHandler.js';
import authenticatedError from '../errors/unauthenticated.js';

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new authenticatedError('no token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  const jwtPayload = verifyAccessToken(token);

  req.userId = jwtPayload.userId;

  next();
});

export default authenticate;
