import { body, cookie, param, query } from 'express-validator';
import { Router } from 'express';

const router = Router();

import getCurrentUser from '../controllers/user/get-current-user.js';
import getUser from '../controllers/user/get-user.js';
import getAllUsers from '../controllers/user/get-all-user.js';

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
    .isInt({ min: 1, max: 20 }.withMessage('limit must be between 1 to 50')),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must positive int'),
  validationError,
  getAllUsers,
);

router.get(
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  getUser,
);

export default router;
