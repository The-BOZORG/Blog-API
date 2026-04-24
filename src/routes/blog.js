import { Router } from 'express';
import { param, query, body } from 'express-validator';

const router = Router();

import createBlog from '../controllers/blog/create-blog.js';

import authorize from '../middlewares/authorize.js';
import authenticate from '../middlewares/autentication.js';
import validationError from '../middlewares/validation-error.js';

router.post(
  '/',
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

export default router;
