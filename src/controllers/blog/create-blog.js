import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import asyncHandler from '../../middlewares/asyncHandler.js';
import { logger } from '../../lib/winstone.js';
import Blog from '../../models/blog.js';

const window = new JSDOM('').window;
const purify = createDOMPurify(window);

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, status } = req.body;
  const userId = req.userId;

  const cleanContent = purify.sanitize(content);
  const newBlog = await Blog.create({
    title,
    content: cleanContent,
    status,
    author: userId,
  });
  logger.info('new blog created', newBlog);
  res.status(200).json({
    blog: newBlog,
  });
});

export default createBlog;
