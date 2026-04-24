import asyncHandler from '../../middlewares/asyncHandler.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.js';
import config from '../../configs/index.js';

const getBlogByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const currentUserId = req.userId;

  const limit = parseInt(req.query.limit) || config.defaultResLimit;
  const offset = parseInt(req.query.offset) || config.defaultResOffset;

  const currentUser = await User.findById(currentUserId)
    .select('+role')
    .lean()
    .exec();

  const query = {};

  if (currentUser?.role === 'user') {
    query.status = 'production';
  }

  const total = await Blog.countDocuments({ author: userId, ...query });
  const blogs = await Blog.find({ author: userId, ...query })
    .select('-__v')
    .populate('author', '-createAt -updateAt -__v')
    .limit(limit)
    .skip(offset)
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

export default getBlogByUser;
