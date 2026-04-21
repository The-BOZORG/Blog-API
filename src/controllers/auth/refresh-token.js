import Token from '../../models/refresh-token.js';
import { generateAccessToken, createTokenCookie } from '../../lib/jwt.js';
import asyncHandler from '../../middlewares/asyncHandler.js';

import authenticatedError from '../../errors/unauthenticated.js';

const refreshToken = asyncHandler(async (req, res) => {
  const refreshTokenCookie = req.signedCookies.refreshToken;

  if (!refreshTokenCookie) {
    throw new authenticatedError('refresh token not found', 401);
  }

  const tokenExist = await Token.exists({ refreshToken: refreshTokenCookie });

  if (!tokenExist) {
    throw new authenticatedError('invalid refresh token', 401);
  }

  const accessToken = generateAccessToken(req.userId);

  res.status(200).json({ accessToken });
});

export default refreshToken;
