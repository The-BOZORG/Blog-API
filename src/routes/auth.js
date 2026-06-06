import { body, cookie } from 'express-validator';
import { Router } from 'express';

const router = Router();

import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
import refreshToken from '../controllers/auth/refresh-token.js';

import authenticate from '../middlewares/autentication.js';
import validationError from '../middlewares/validation-error.js';

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login and receive access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in
 */
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

/**
 * @openapi
 * /auth/refreshToken:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token using refresh token cookie
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post(
  '/refreshToken',
  cookie('refreshToken')
    .notEmpty()
    .withMessage('refreshToken required')
    .isJWT()
    .withMessage('invalid refreshToken'),
  validationError,
  refreshToken,
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout and revoke refresh token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', authenticate, logout);

export default router;
