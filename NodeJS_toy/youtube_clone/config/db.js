import mongoose from 'mongoose';

import winstonLogger from './winston.js';

export const connectDb = async () => {
  const mongodbUri = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_CLOUD_TEST
    : process.env.MONGODB_CLOUD_PROD;

  if (!mongodbUri) {
    throw new Error('MongoDB connection string is not configured');
  }

  await mongoose.connect(mongodbUri);
  winstonLogger.info(`Connected to mongodb for ${process.env.NODE_ENV || 'development'}`);
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
