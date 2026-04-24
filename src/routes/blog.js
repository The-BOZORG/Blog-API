import { Router } from 'express';
import { param, query, body } from 'express-validator';

const router = Router();

import createBlog from '../controllers/blog/create-blog.js';
import getAllBlogs from '../controllers/blog/get-all-blog.js';
import getBlogByUser from '../controllers/blog/get-blog-by-user.js';

import authorize from '../middlewares/authorize.js';
import authenticate from '../middlewares/autentication.js';
import validationError from '../middlewares/validation-error.js';

router.post(
  '/create',
  authenticate,
  authorize('admin'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('title required')
    .isLength({ max: 120 })
    .withMessage('title must be less than 120 characters'),
  body('content').notEmpty().withMessage('content required'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('status must be one of the values,draft or published'),
  validationError,
  createBlog,
);

router.get(
  '/',
  authenticate,
  authorize('admin', 'user'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must positive int'),
  validationError,
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize('admin', 'user'),
  param('userId').isMongoId().withMessage('invalid user id'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must positive int'),
  validationError,
  getBlogByUser,
);
export default router;
