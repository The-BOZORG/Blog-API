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

router.get(
  '/current',
  authenticate,
  authorize('admin', 'user'),
  getCurrentUser,
);

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

router.get(
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  getUser,
);

router.delete(
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  deleteUser,
);

export default router;
