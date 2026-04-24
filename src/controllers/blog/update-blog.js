import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { logger } from '../../lib/winstone.js';
import notFoundError from '../../errors/not-found.js';
import authenticatedError from '../../middlewares/autentication.js';

import asyncHandler from '../../middlewares/asyncHandler.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.js';

//XSS
const window = new JSDOM('').window;
const purify = createDOMPurify(window);

const updateBlog = asyncHandler(async (req, res) => {
  const { content, title, status } = req.body;

  const userId = req.userId;
  const blogId = req.params.blogId;

  const user = await User.findById(userId).select('+role').lean().exec();

  const blog = await Blog.findById(blogId).select('-__v').exec();

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

  if (title) blog.title = title;
  if (content) {
    const cleanContent = purify.sanitize(content);
    blog.content = cleanContent;
  }
  if (status) blog.status = status;

  await blog.save();

  logger.info('blog updated', {
    blog,
  });

  res.status(200).json({
    blog,
  });
});

export default updateBlog;
