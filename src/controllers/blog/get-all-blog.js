import asyncHandler from '../../middlewares/asyncHandler.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.JS';
import config from '../../configs/index.js';

const getAllBlogs = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const limit = parseInt(req.query.limit) || config.defaultResLimit;
  const offset = parseInt(req.query.offset) || config.defaultResOffset;
  const total = await Blog.countDocuments();

  const user = await User.findById(userId).select('+role').lean().exec();

  const query = {};

  if (user?.role === 'user') {
    query.status = 'published';
  }

  const blogs = await Blog.find(query)
    .select('-__v')
    .populate('author', '-createdAt -updateAt -__v')
    .skip(offset)
    .limit(limit)
    .sort({ createAt: -1 })
    .lean()
    .exec();

  res.status(200).json({
    limit,
    offset,
    total,
    blogs,
  });
});

export default getAllBlogs;
