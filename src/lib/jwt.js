import config from '../configs/index.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: 'accessToken',
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
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

export const createTokenCookie = (res, userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: config.ACCESS_TOKEN_EXPIRY,
    signed: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: config.REFRESH_TOKEN_EXPIRY,
    signed: true,
  });

  return { accessToken, refreshToken };
};
