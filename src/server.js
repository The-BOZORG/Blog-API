import app from './app.js';
import config from './configs/index.js';
import { connectToDB, disconnectFromDB } from './configs/data-base.js';
import { logger } from './lib/winstone.js';

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(config.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

const serverShutdown = async () => {
  try {
    await disconnectFromDB();
    logger.warn('server SHUTDOWN');
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown', error);
  }
};

process.on('SIGTERM', serverShutdown);
process.on('SIGINT', serverShutdown);

startServer();
