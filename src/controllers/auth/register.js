import config from '../../configs/index.js';
import { logger } from '../../lib/winstone.js';
import User from '../../models/user.js';
import Token from '../../models/refresh-token.js';
import { generateAccessToken, createTokenCookie } from '../../lib/jwt.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import unauthorizedError from '../../errors/auathroized.js';
import badRequestError from '../../errors/bad-request.js';
import { generateUsername } from '../../utils/index.js';

const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const emailExist = await User.findOne({ email }).lean().exec();

  if (emailExist) {
    throw new badRequestError('email already exist', 401);
  }

  if (role === 'admin' && !config.WHITELIST_ADMIN_MAIL.includes(email)) {
    logger.warn(
      `user with email: ${email} tried to register as an admin but is not in whitelist`,
    );
    throw new unauthorizedError('you can not register as admin', 403);
  }

  const username = generateUsername();

  const newUser = await User.create({ username, email, password, role });

  const accessToken = generateAccessToken(newUser._id);

  const refreshToken = createTokenCookie(res, newUser._id);

  await Token.create({ refreshToken: refreshToken, user: newUser._id });

  logger.info('refresh token created', {
    userId: newUser._id,
    token: refreshToken,
  });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
    accessToken,
  });

  logger.info('user register success!', newUser);
});

export default register;
