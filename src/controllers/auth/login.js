import { generateAccessToken, createTokenCookie } from '../../lib/jwt.js';
import User from '../../models/user.js';
import Token from '../../models/refresh-token.js';
import { logger } from '../../lib/winstone.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import notFoundError from '../../errors/not-found.js';
import authenticatedError from '../../middlewares/autentication.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .select('username email +password role')
    .exec();

  if (!user) {
    throw new notFoundError('user not found', 404);
  }

  const passwordCorrect = await user.comparePassword(password);
  if (!passwordCorrect) {
    throw new authenticatedError('invalid login', 401);
  }

  const deviceId = `${req.headers['user-agent']}-${req.ip}`;
  await Token.deleteOne({ user: user._id, deviceId });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = createTokenCookie(res, user._id);

  await Token.create({
    refreshToken: refreshToken,
    user: user._id,
    deviceId,
    userAgent: req.headers['user-agent'] || 'unknown',
    ip: req.ip || req.connection.remoteAddress,
  });

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
  });
  logger.info('user login success', user);
});

export default login;
