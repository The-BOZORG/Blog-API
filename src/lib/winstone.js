import winston from 'winston';
import config from '../configs/index.js';

const { combine, colorize, timestamp, align, errors, printf, json } =
  winston.format;

const transports = [];

if (config.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        align(),
        errors({ stack: true }),
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';

          return `${timestamp} [${level}]:${message}${metaStr}`;
        }),
      ),
    }),
  );
}

if (config.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  );

  transports.push(
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test',
});
export { logger };
