import { logger } from '../../lib/winstone.js';
import asyncHandler from '../../middlewares/asyncHandler.js';

import Token from '../../models/refresh-token.js';

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await Token.deleteOne({ refreshToken: refreshToken });
  }
  logger.info('user refreshToken deleted successfully', {
    userId: req.userId,
    refreshToken: refreshToken,
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  logger.info('user logout success');
  res.sendStatus(204);
});

export default logout;
