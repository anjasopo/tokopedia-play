import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(config.databaseUrl);
    logger.info(`[MongoDB] Database connected successfully to ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error(`[MongoDB] Database connection failure: ${error.message}`);
    // Don't crash in dev mode if DB is offline, allow server to run with mock/fallback
    if (config.isProduction) {
      process.exit(1);
    }
    return mongoose;
  }
};
