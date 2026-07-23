import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

mongoose.set('strictQuery', true);

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if ((mongoose.connection.readyState as number) === 1) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(config.databaseUrl, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    logger.info(`[MongoDB] Database connected successfully to ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error(`[MongoDB] Database connection failure: ${error.message}`);
    throw error;
  }
};
