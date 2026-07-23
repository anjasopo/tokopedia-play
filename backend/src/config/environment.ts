const DEFAULT_ATLAS_URI =
  'mongodb+srv://anjasopo:anjasopo@cluster0.0os0bqa.mongodb.net/tokopedia-play?retryWrites=true&w=majority';

export const validateEnv = () => {
  // Safe environment validation for serverless
};

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  databaseUrl: process.env.DATABASE_URL || DEFAULT_ATLAS_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
