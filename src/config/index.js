module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || '0jwt_secret1',
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://manu:manu123!@ds235732.mlab.com:35732/customer_api'
};
