import User from '../../models/user.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import notFoundError from '../../errors/not-found.js';

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).select('-__v').lean().exec();
  if (!user) {
    throw new notFoundError('user not found', 404);
  }
  res.status(200).json({ user });
});

export default getCurrentUser;
