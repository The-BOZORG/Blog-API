import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

//custom module
import config from './configs/index.js';
import { logger } from './lib/winstone.js';
import limiter from './lib/limiter.js';

//middlewares
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  compression({
    threshold: 1024,
  }),
);
app.use(helmet());
app.use(limiter());
//route
export default app;
