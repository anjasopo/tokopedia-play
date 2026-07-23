import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

// Disable Mongoose command buffering in serverless so queries never wait 10s if DB is connecting
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    const readyState = mongoose.connection.readyState as number;
    if (readyState === 1) {
      return mongoose;
    }
    
    // If connection is in progress, wait briefly
    if (readyState === 2) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if ((mongoose.connection.readyState as number) === 1) {
        return mongoose;
      }
    }

    const conn = await mongoose.connect(config.databaseUrl, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    logger.info(`[MongoDB] Database connected successfully to ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error(`[MongoDB] Database connection failure: ${error.message}`);
    return mongoose;
  }
};
