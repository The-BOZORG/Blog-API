import { body, cookie } from 'express-validator';
import { Router } from 'express';

const router = Router();

import register from '../controllers/auth/register';

import User from '../models/user';

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
    .withMessage('password must be more than 6 char'),
  body('role')
    .optional()
    .isString()
    .withMessage('role must be string')
    .isIn(['admin', 'user'])
    .withMessage('role must be either admin or user'),
  register,
);
