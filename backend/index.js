require('dotenv').config();

const { validateEnv, config } = require('./src/config/environment');
const { connectDatabase } = require('./src/config/database');
const createApp = require('./src/app');

const startServer = async () => {
  try {
    validateEnv();
    await connectDatabase();

    const app = createApp();

    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
