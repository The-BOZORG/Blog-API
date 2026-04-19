import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: 'you have too many request in a time, pls try again later',
  },
});

export default limiter;
