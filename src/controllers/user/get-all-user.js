import User from '../../models/user.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import notFoundError from '../../errors/not-found.js';
import config from '../../configs/index.js';

const getAllUsers = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const limit = parseInt(req.query.limit) || config.defaultResLimit;
  const offset = parseInt(req.query.offset) || config.defaultResOffset;

  const total = await User.countDocuments();
  const users = await User.find()
    .select('-__v')
    .limit(limit)
    .skip(offset)
    .lean()
    .exec();

  res.status(200).json({ limit, offset, total, users });
});

export default getAllUsers;
