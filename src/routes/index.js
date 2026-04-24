import { Router } from 'express';

const router = Router();

import authRouter from './auth.js';
import userRouter from './user.js';
import blogRouter from './blog.js';

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'test',
    status: 'ok',
    timeStamp: new Date().toString(),
  });
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/blog', blogRouter);

export default router;
