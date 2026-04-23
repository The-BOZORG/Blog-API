import { body, cookie, param } from 'express-validator';
import { Router } from 'express';

const router = Router();

import getCurrentUser from '../controllers/user/get-current-user.js';
import getUser from '../controllers/user/get-user.js';

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
  '/:userId',
  authenticate,
  authorize('admin'),
  param('userId').notEmpty().isMongoId().withMessage('invalid user id'),
  validationError,
  getUser,
);

export default router;
