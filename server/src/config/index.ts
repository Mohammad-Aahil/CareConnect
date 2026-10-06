export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/careconnect',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
