import User from '../../models/user.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import notFoundError from '../../errors/not-found.js';

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select('-__v').exec();

  if (!user) {
    throw new notFoundError('user not found', 404);
  }

  res.status(200).json({ user });
});

export default getUser;
