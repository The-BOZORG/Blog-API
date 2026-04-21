import { body, cookie } from 'express-validator';
import { Router } from 'express';

const router = Router();

import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import validationError from '../middlewares/validation-error.js';

router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isLength({ max: 40 })
    .withMessage('email must be less than 40 characters')
    .isEmail()
    .withMessage('invalid email address'),
  body('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be more than 6 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('role must be string')
    .isIn(['admin', 'user'])
    .withMessage('role must be either admin or user'),
  validationError,
  register,
);

router.post(
  '/login',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isLength({ max: 40 })
    .withMessage('email must be less than 40 characters')
    .isEmail()
    .withMessage('invalid email address'),
  body('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be more than 6 characters'),
  validationError,
  login,
);

export default router;
