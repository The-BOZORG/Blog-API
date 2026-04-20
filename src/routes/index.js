import { Route } from 'express';

const router = Route();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'test',
    status: 'ok',
    timeStamp: new Date().toString(),
  });
});
