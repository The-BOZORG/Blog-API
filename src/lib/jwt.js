import config from '../configs/index.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = ({ payload }) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: 'accessToken',
  });
};

export const generateRefreshToken = ({ payload }) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
    subject: 'refreshToken',
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

export const createTokenCookie = ({ res, user }) => {
  const refreshToken = generateRefreshToken({ payload: user });

  const cookieMaxAge = 7 * 24 * 60 * 60 * 1000;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: cookieMaxAge,
    signed: true,
  });

  return refreshToken;
};

export const createPayload = (user) => {
  return { userId: user._id, role: user.role };
};
