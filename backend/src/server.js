const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');
const { helmet, limiter, mongoSanitize } = require('./middleware/security.middleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Load passport configuration
require('./config/passport');

const app = express();

// Security middleware
app.use(helmet);
app.use(limiter);
app.use(mongoSanitize);

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
  res.json({ message: 'E-commerce API Server', version: '1.0.0' });
});

const authRoutes = require('./routes/auth-simple.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes');
const paymentRoutes = require('./routes/payment.routes');
const { authLimiter, paymentLimiter } = require('./middleware/security.middleware');

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payment', paymentLimiter, paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
