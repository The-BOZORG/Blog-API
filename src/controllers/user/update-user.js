import User from '../../models/user.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import notFoundError from '../../errors/not-found.js';
import { logger } from '../../lib/winstone.js';
import badRequestError from '../../errors/bad-request.js';

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { username, email, firstName, lastName, currentPassword, newPassword } =
    req.body;

  const user = await User.findById(userId).select('+password -__v').exec();

  if (!user) {
    throw new notFoundError('user not found', 404);
  }

  if (newPassword) {
    if (!currentPassword) {
      throw new badRequestError('current password is required', 400);
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      throw new badRequestError('current password is incorrect', 400);
    }

    user.password = newPassword;
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;

  await user.save();
  logger.info('user update success', user);

  res.status(200).json({
    user,
  });
});

export default updateUser;
