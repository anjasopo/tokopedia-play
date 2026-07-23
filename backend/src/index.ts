import 'dotenv/config';
import { createServer } from 'http';
import { createApp } from './app';
import { connectDatabase } from './config/database';
import { validateEnv, config } from './config/environment';
import { initSocket } from './socket';
import { logger } from './utils/logger';

const startServer = async () => {
  try {
    validateEnv();
    await connectDatabase();

    const app = createApp();
    const httpServer = createServer(app);

    // Initialize Socket.IO on the same HTTP server
    initSocket(httpServer);

    httpServer.listen(config.port, () => {
      logger.info(`🚀 Tokopedia Play Backend running at http://localhost:${config.port}`);
      logger.info(`📄 API Docs available at http://localhost:${config.port}/api-docs`);
      logger.info(`🔌 Socket.IO real-time gateway active`);
    });
  } catch (error: any) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
