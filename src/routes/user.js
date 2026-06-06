import { body, cookie, param, query } from 'express-validator';
import { Router } from 'express';

const router = Router();

import getCurrentUser from '../controllers/user/get-current-user.js';
import getUser from '../controllers/user/get-user.js';
import getAllUsers from '../controllers/user/get-all-user.js';
import updateUser from '../controllers/user/update-user.js';
import deleteUser from '../controllers/user/delete-user.js';

import authorize from '../middlewares/authorize.js';
import validationError from '../middlewares/validation-error.js';
import authenticate from '../middlewares/autentication.js';

/**
 * @openapi
 * /user/current:
 *   get:
 *     tags:
 *       - User
 *     summary: Get current authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get(
  '/current',
  authenticate,
  authorize('admin', 'user'),
  getCurrentUser,
);

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users (admin only)
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
 *         description: List of users
 */
router.get(
  '/',
  authenticate,
  authorize('admin'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must positive int'),
  validationError,
  getAllUsers,
);

/**
 * @openapi
 * /user/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Update current user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 */
router.put(
  '/update',
  authenticate,
  authorize('admin', 'user'),
  body('username')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('username must be less than 20 characters'),
  body('email')
    .optional()
    .isLength({ max: 40 })
    .withMessage('email must be less than 40 characters')
    .isEmail()
    .withMessage('invalid email'),
  body('currentPassword')
    .if(body('newPassword').exists())
    .notEmpty()
    .withMessage('current password is required'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 })
    .withMessage('new password must be least 6 characters'),
  body('firstName')
    .optional()
    .isLength({ max: 20 })
    .withMessage('first name must be less than 20 characters'),
  body('lastName')
    .optional()
    .isLength({ max: 20 })
    .withMessage('last name must be less than 20 characters'),
  validationError,
  updateUser,
);

/**
 * @openapi
 * /user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by id (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 */
router.get(
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  getUser,
);

/**
 * @openapi
 * /user/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by id (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete(
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  deleteUser,
);

export default router;
