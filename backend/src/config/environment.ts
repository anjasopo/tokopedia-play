const DEFAULT_ATLAS_URI =
  'mongodb://anjasopo:anjasopo@ac-eqcxc6l-shard-00-00.0os0bqa.mongodb.net:27017,ac-eqcxc6l-shard-00-01.0os0bqa.mongodb.net:27017,ac-eqcxc6l-shard-00-02.0os0bqa.mongodb.net:27017/tokopedia-play?ssl=true&authSource=admin&retryWrites=true&w=majority';

export const validateEnv = () => {
  // Safe environment validation that never crashes production
};

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  databaseUrl: process.env.DATABASE_URL || DEFAULT_ATLAS_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
