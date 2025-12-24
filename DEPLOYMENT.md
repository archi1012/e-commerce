# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. MongoDB Atlas account with database
4. Razorpay account with API keys

## Step 1: Deploy Backend

```bash
cd backend
vercel
```

**Environment Variables (Add in Vercel Dashboard):**
- `NODE_ENV` = `production`
- `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`
- `JWT_SECRET` = `your-super-long-jwt-secret-key-at-least-32-characters`
- `SESSION_SECRET` = `your-super-long-session-secret-key-at-least-32-characters`
- `RAZORPAY_KEY_ID` = `rzp_live_your_key_id`
- `RAZORPAY_KEY_SECRET` = `your_razorpay_secret_key`
- `FRONTEND_URL` = `https://your-frontend-domain.vercel.app`

## Step 2: Deploy Frontend

```bash
cd frontend
vercel
```

**Environment Variables (Add in Vercel Dashboard):**
- `VITE_API_URL` = `https://your-backend-domain.vercel.app/api`
- `VITE_RAZORPAY_KEY_ID` = `rzp_live_your_key_id`

## Step 3: Configure MongoDB Atlas
1. Whitelist Vercel IPs: `0.0.0.0/0` (or specific IPs)
2. Create database user with read/write permissions
3. Get connection string and add to `MONGODB_URI`

## Step 4: Configure Razorpay
1. Switch to Live mode in Razorpay Dashboard
2. Add your domain to authorized domains
3. Get Live API keys and add to environment variables

## Step 5: Test Deployment
1. Visit your frontend URL
2. Test user registration/login
3. Test product operations
4. Test cart functionality
5. Test payment flow

## Troubleshooting
- Check Vercel function logs for backend errors
- Ensure all environment variables are set
- Verify MongoDB connection string
- Check CORS settings match your frontend domain