import app from './app.js';
import config from './configs/index.js';
import { connectToDB, disconnectFromDB } from './configs/data-base.js';

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(config.PORT, () => {});
  } catch (error) {}
};
