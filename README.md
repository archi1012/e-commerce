# E-commerce Full-Stack Application

A modern e-commerce application with React frontend and Node.js backend.

## 📁 Project Structure

```
e-commerce/
├── frontend/           # React frontend application
│   ├── src/           # React source code
│   ├── package.json   # Frontend dependencies
│   └── vite.config.ts # Frontend build configuration
│
├── backend/            # Node.js backend API
│   ├── src/
│   │   ├── config/    # Database configuration
│   │   ├── models/    # MongoDB models
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/    # API routes
│   │   ├── middleware/ # Custom middleware
│   │   └── server.js  # Entry point
│   ├── package.json   # Backend dependencies
│   └── .env          # Environment variables
│
└── README.md          # This file
```

## 🚀 Quick Start

### Install All Dependencies
```bash
npm run install-all
```

### Frontend Development
```bash
cd frontend
npm run dev
```
Frontend: `http://localhost:5173`

### Backend Development
```bash
cd backend
npm run dev
```
Backend: `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Tailwind CSS 4.1.12** - Utility-first CSS
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Available Scripts

### Root Level
- `npm run install-all` - Install all dependencies
- `npm run dev` - Start frontend dev server
- `npm run backend` - Start backend dev server
- `npm run build` - Build frontend for production

### Frontend (`cd frontend`)
- `npm run dev` - Development server
- `npm run build` - Production build

### Backend (`cd backend`)
- `npm run dev` - Development server with nodemon
- `npm start` - Production server

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get categories

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## 🔧 Environment Setup

### Backend Environment Variables
Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `backend/.env`
3. Start the backend server

## 🎯 Features

- ✅ User authentication (register/login)
- ✅ Product catalog with categories
- ✅ Shopping cart management
- ✅ Order processing
- ✅ User profile and order history
- ✅ Responsive design
- ✅ JWT-based authentication
- ✅ RESTful API design

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)