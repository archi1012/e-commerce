const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Initialize passport strategies (will no-op if env vars not provided)
require('./config/passport');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.json({ message: 'E-commerce API Server', version: '1.0.0' }));

// Routes
app.use('/api/auth', require('./routes/auth-simple.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/reviews', require('./routes/review.routes'));

// health
app.get('/api/health', (req, res) => res.json({ message: 'Server is running!' }));

module.exports = app;
