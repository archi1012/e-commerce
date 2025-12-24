const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const mongoUri = uri || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set');
    }
    const conn = await mongoose.connect(mongoUri, { });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // don't exit here so tests can handle errors
    throw error;
  }
};

module.exports = connectDB;