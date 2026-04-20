import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from '../lib/jwt.js';
import asyncHandler from './asyncHandler.js';
import authenticatedError from '../errors/unauthenticated.js';
import Token from '../models/refresh-token.js';

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const jwtPayload = verifyAccessToken(token);
      req.userId = jwtPayload.userId;
    } catch (error) {
      throw new authenticatedError('invalid access token', 401);
    }
    return next();
  }

  const refreshToken = req.signedCookies.refreshToken;

  if (!refreshToken) {
    throw new authenticatedError('no token provided', 401);
  }

  const refreshPayload = verifyRefreshToken(refreshToken);

  const existingToken = await Token.findOne({
    user: refreshPayload.userId,
    refreshToken: refreshToken,
  });

  if (!existingToken || !existingToken?.isValid) {
    throw new authenticatedError('invalid refresh token', 401);
  }

  const newAccessToken = generateAccessToken(refreshPayload.userId);

  res.setHeader('x-access-token', newAccessToken);

  req.userId = refreshPayload.userId;

  next();
});

export default authenticate;
