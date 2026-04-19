import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

//custom module
import config from './configs/index.js';
import { logger } from './lib/winstone.js';
import limiter from './lib/limiter.js';
import notFound from './middlewares/404.js';

//core
const corsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error : ${origin} is not allow by CORS`), false);
      logger.warn(`CORS error :${origin} is not allow by CORS`);
    }
  },
  credentials: true,
};

//middlewares
app.use(cors(corsOptions));
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
app.use(limiter);
//routes & error handlers
app.use(notFound);
export default app;
