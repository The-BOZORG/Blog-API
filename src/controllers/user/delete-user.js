import User from '../../models/user.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import { logger } from '../../lib/winstone.js';

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  await User.deleteOne({ _id: userId });
  logger.info('user account has deleted', {
    userId,
  });
  res.sendStatus(204);
});

export default deleteUser;
