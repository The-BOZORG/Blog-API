import { Router } from 'express';
import { param, query, body } from 'express-validator';

const router = Router();

import createBlog from '../controllers/blog/create-blog.js';
import getAllBlogs from '../controllers/blog/get-all-blog.js';
import getBlogByUser from '../controllers/blog/get-blog-by-user.js';
import updateBlog from '../controllers/blog/update-blog.js';
import deleteBlog from '../controllers/blog/delete-blog.js';

import authorize from '../middlewares/authorize.js';
import authenticate from '../middlewares/autentication.js';
import validationError from '../middlewares/validation-error.js';

/**
 * @openapi
 * /blog/create:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new blog post (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created
 */
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

/**
 * @openapi
 * /blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of blogs
 */
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

/**
 * @openapi
 * /blog/user/{userId}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get blogs by user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blogs for user
 */
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

/**
 * @openapi
 * /blog/{blogId}:
 *   put:
 *     tags:
 *       - Blog
 *     summary: Update a blog post (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Blog updated
 */
router.put(
  '/:blogId',
  authenticate,
  authorize('admin'),
  param('blogId').isMongoId().withMessage('invalid blog id'),
  body('title')
    .optional()
    .isLength({ max: 120 })
    .withMessage('title must be less than 120 characters'),
  body('content'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('status must be one of the value, draft or published'),
  validationError,
  updateBlog,
);

/**
 * @openapi
 * /blog/{blogId}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete a blog post (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted
 */
router.delete('/:blogId', authenticate, authorize('admin'), deleteBlog);

export default router;
