import 'dotenv/config';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { createApp } from './app';
import { connectDatabase } from './config/database';

const app = createApp();

// Database connection middleware for Vercel Serverless Function
app.use(async (req: Request, res: Response, next: NextFunction) => {
  // Ensure CORS headers are present on all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure DB is connected before processing any query
  if ((mongoose.connection.readyState as number) !== 1) {
    try {
      await connectDatabase();
    } catch (err: any) {
      console.error('[Serverless DB Error]', err.message);
      return res.status(500).json({
        success: false,
        message: 'Database connection failed. Please ensure DATABASE_URL is configured in Vercel Environment Variables.',
        error: err.message,
      });
    }
  }
  next();
});

export default app;
