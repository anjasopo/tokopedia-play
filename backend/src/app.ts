import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { apiRateLimiter } from './middlewares/rateLimiter';
import { logger } from './utils/logger';
import swaggerDocument from './docs/swagger.json';

export const createApp = (): Express => {
  const app = express();

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabled for embedded YouTube iframe support
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Structured Logging
  app.use(pinoHttp({ logger }));

  // Body Parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Global API Rate Limiter
  app.use('/api', apiRateLimiter);

  // Interactive Swagger API Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'tokopedia-play-backend',
    });
  });

  // API Versioning Routes
  app.use('/api/v1', routes);
  app.use('/api', routes); // Alias for backward compatibility

  // Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
