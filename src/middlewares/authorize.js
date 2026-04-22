import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/user.js';
import notFoundError from '../errors/not-found.js';
import unauthorizedError from '../errors/auathroized.js';

const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const user = await User.findById(userId).select('role').exec();

    if (!user) {
      throw new notFoundError('user not found', 404);
    }

    if (!roles.includes(user.role)) {
      throw new unauthorizedError('Access denied', 403);
    }

    next();
  });
};

export default authorize;
