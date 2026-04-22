import { body, cookie } from 'express-validator';
import { Router } from 'express';

const router = Router();

import getCurrentUser from '../controllers/user/get-current-user.js';

import authorize from '../middlewares/authorize.js';
import validationError from '../middlewares/validation-error.js';
import authenticate from '../middlewares/autentication.js';

router.get(
  '/current',
  authenticate,
  authorize('admin', 'user'),
  getCurrentUser,
);

export default router;
