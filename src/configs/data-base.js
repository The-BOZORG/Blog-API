import mongoose from 'mongoose';

import config from '../configs/index.js';

export const connectToDB = async () => {
  if (!config.MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the config');
  }
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to database successfully 🟢', {
      uri: config.MONGO_URI,
    });
  } catch (error) {
    console.error('Error connection to database 🔴', error);
    throw error;
  }
};

export const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnect from database success ✅', {
      uri: config.MONGO_URI,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log('Error disconnect form database 🔴', error);
  }
};
