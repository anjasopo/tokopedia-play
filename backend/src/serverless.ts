import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { createApp } from './app';
import { connectDatabase } from './config/database';

const app = createApp();

let isConnected = false;

// Database connection middleware for Vercel Serverless Function
app.use(async (req: Request, res: Response, next: NextFunction) => {
  // Ensure CORS headers are present on all responses including 404s
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (err: any) {
      console.error('[Serverless] DB Connection Error:', err.message);
    }
  }
  next();
});

export default app;
