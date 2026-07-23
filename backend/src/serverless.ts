import 'dotenv/config';
import { createApp } from './app';
import { connectDatabase } from './config/database';
import { validateEnv } from './config/environment';

validateEnv();
connectDatabase();

const app = createApp();

export default app;
