import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// custom modules
import config from './configs/index.js';
import { logger } from './lib/winstone.js';
import limiter from './lib/limiter.js';
import notFound from './middlewares/404.js';
import errorHandler from './middlewares/error-handler.js';

// route
import Routes from './routes/index.js';

// CORS
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

// security
app.use(helmet());

// logging
app.use(morgan('dev'));

// CORS
app.use(cors(corsOptions));

// parsers
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// compression
app.use(
  compression({
    threshold: 1024,
  }),
);

// rate limiters
app.use(limiter);

// main route
app.use('/api', Routes);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
