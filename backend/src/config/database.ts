import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(config.databaseUrl);
    logger.info(`[MongoDB] Database connected successfully to ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error(`[MongoDB] Database connection failure: ${error.message}`);
    return mongoose;
  }
};
