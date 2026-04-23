import Token from '../../models/refresh-token.js';
import { generateAccessToken, verifyRefreshToken } from '../../lib/jwt.js';
import asyncHandler from '../../middlewares/asyncHandler.js';

import authenticatedError from '../../errors/unauthenticated.js';

const refreshToken = asyncHandler(async (req, res) => {
  const refreshTokenCookie = req.cookies?.refreshToken;

  if (!refreshTokenCookie) {
    throw new authenticatedError('refresh token not found', 401);
  }

  const refreshPayload = verifyRefreshToken(refreshTokenCookie);

  const tokenExist = await Token.exists({
    refreshToken: refreshTokenCookie,
    deviceId: `${req.headers['user-agent']}-${req.ip}`,
  });

  if (!tokenExist) {
    throw new authenticatedError('invalid refresh token', 401);
  }

  const payload = {
    userId: refreshPayload.userId,
    role: refreshPayload.role,
  };

  const accessToken = generateAccessToken({ payload });

  res.status(200).json({ accessToken });
});

export default refreshToken;
