export const validateEnv = () => {
  if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    console.warn('[Environment Warning] DATABASE_URL is not set in production. Please configure DATABASE_URL in your hosting provider environment variables.');
  }
};

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  databaseUrl: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tokopedia-play',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
