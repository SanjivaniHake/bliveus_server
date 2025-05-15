export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI,
  // jwtSecret: process.env.JWT_SECRET,
  // jwtExpiresIn: process.env.JWT_EXPIRES_IN || '5m',
});
