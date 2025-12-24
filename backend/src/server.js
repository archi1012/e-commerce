const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');

// Load environment variables first
dotenv.config();

// Connect to database
connectDB();

// Load passport configuration
try {
  require('./config/passport');
} catch (error) {
  console.log('Passport config not found, skipping...');
}

const app = express();

// Basic security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many auth attempts'
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many payment attempts'
});

// Apply security middleware
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'WINGER E-commerce API Server', version: '1.0.0' });
});

// Import routes with error handling
let authRoutes, productRoutes, cartRoutes, orderRoutes, reviewRoutes, paymentRoutes;

try {
  authRoutes = require('./routes/auth-simple.routes');
  productRoutes = require('./routes/product.routes');
  cartRoutes = require('./routes/cart.routes');
  orderRoutes = require('./routes/order.routes');
  reviewRoutes = require('./routes/review.routes');
  paymentRoutes = require('./routes/payment.routes');
} catch (error) {
  console.error('Route import error:', error.message);
}

// Apply routes with error handling
if (authRoutes) app.use('/api/auth', authLimiter, authRoutes);
if (productRoutes) app.use('/api/products', productRoutes);
if (cartRoutes) app.use('/api/cart', cartRoutes);
if (orderRoutes) app.use('/api/orders', orderRoutes);
if (reviewRoutes) app.use('/api/reviews', reviewRoutes);
if (paymentRoutes) app.use('/api/payment', paymentLimiter, paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'WINGER Server is running!', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 WINGER Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
