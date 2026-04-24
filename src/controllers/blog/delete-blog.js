import { logger } from '../../lib/winstone.js';
import notFoundError from '../../errors/not-found.js';
import authenticatedError from '../../middlewares/autentication.js';

import asyncHandler from '../../middlewares/asyncHandler.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.js';

const deleteBlog = asyncHandler(async (req, res) => {
  const { content, status, title } = req.body;

  const userId = req.userId;
  const blogId = req.params.blogId;

  const user = await User.findById(userId).select('+role').lean().exec();

  const blog = await Blog.findById(blogId)
    .select('author banner.publicId')
    .lean()
    .exec();

  if (!blog) {
    throw new notFoundError('blog not found', 404);
  }

  if (blog.author !== userId && user?.role !== 'admin') {
    throw new authenticatedError('access denied', 403);
  }
  logger.warn('a user tried to update a blog without permission', {
    userId,
    blog,
  });

  await Blog.deleteOne({ _id: blogId });
  logger.info('blog delete success', {
    blogId,
  });
  res.sendStatus(204);
});

export default deleteBlog;
