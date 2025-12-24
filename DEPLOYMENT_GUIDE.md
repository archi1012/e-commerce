# 🚀 WINGER E-commerce Deployment Guide

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ Code Preparation
- [ ] All syntax errors fixed
- [ ] Package.json files are valid JSON
- [ ] Environment variables use correct naming (VITE_ for frontend)
- [ ] No console.log statements in production code
- [ ] All imports are used and valid
- [ ] Build commands work locally (`npm run build`)

### ✅ Database Setup
- [ ] MongoDB Atlas account created
- [ ] Database cluster created and running
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0 for cloud deployment)
- [ ] Connection string obtained

### ✅ Payment Setup
- [ ] Razorpay account created
- [ ] Live API keys obtained (for production)
- [ ] Test keys available (for development)
- [ ] Webhook URLs configured (if needed)

## 🖥️ BACKEND DEPLOYMENT (Railway)

### Step 1: Prepare Repository
```bash
cd backend
npm install
npm start  # Test locally first
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose the `backend` folder as root directory

### Step 3: Configure Environment Variables
In Railway Dashboard → Variables, add:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/winger_ecommerce
JWT_SECRET=your-32-character-secret
SESSION_SECRET=your-32-character-secret
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 4: Deploy and Test
1. Railway will auto-deploy
2. Check logs for errors
3. Test health endpoint: `https://your-backend.railway.app/api/health`
4. Copy the Railway URL for frontend configuration

## 📱 FRONTEND DEPLOYMENT (Vercel)

### Step 1: Prepare Repository
```bash
cd frontend
npm install
npm run build  # Test build locally
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Set Framework Preset to "Vite"
6. Set Root Directory to `frontend`

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:
```
VITE_API_URL=https://your-backend.railway.app/api
VITE_RAZORPAY_KEY_ID=rzp_live_your_key
VITE_APP_NAME=WINGER
```

### Step 4: Update Backend CORS
1. Go back to Railway
2. Update `FRONTEND_URL` variable with your Vercel URL
3. Redeploy backend

## 🔧 COMMON DEPLOYMENT ERRORS & FIXES

### Frontend Errors:

**Error: "process is not defined"**
```javascript
// ❌ Wrong
const API_URL = process.env.REACT_APP_API_URL;

// ✅ Correct
const API_URL = import.meta.env.VITE_API_URL;
```

**Error: "Failed to fetch"**
- Check if backend URL is correct
- Verify CORS configuration
- Check if backend is running

**Error: "Build failed"**
- Check package.json syntax
- Ensure all dependencies are in dependencies, not devDependencies
- Check for TypeScript errors

### Backend Errors:

**Error: "Cannot connect to MongoDB"**
- Check MongoDB URI format
- Verify database user permissions
- Check network access settings

**Error: "Module not found"**
- Check all require() statements
- Ensure all dependencies are installed
- Check file paths and case sensitivity

**Error: "Port already in use"**
- Railway automatically assigns PORT
- Use `process.env.PORT || 5000`

## 🧪 POST-DEPLOYMENT TESTING

### Test Checklist:
1. **Homepage loads** ✅
2. **User registration works** ✅
3. **User login works** ✅
4. **Products display** ✅
5. **Add to cart works** ✅
6. **Checkout process works** ✅
7. **Payment integration works** ✅
8. **Admin/Seller features work** ✅

### Performance Checks:
- [ ] Page load times < 3 seconds
- [ ] Images load properly
- [ ] Mobile responsiveness works
- [ ] No console errors
- [ ] API responses < 2 seconds

## 🆘 TROUBLESHOOTING

### If Frontend Won't Load:
1. Check Vercel deployment logs
2. Verify build command succeeded
3. Check environment variables
4. Test API endpoints manually

### If Backend Won't Start:
1. Check Railway deployment logs
2. Verify all environment variables
3. Test MongoDB connection
4. Check for syntax errors

### If API Calls Fail:
1. Check CORS configuration
2. Verify API URLs
3. Check authentication tokens
4. Test endpoints with Postman

## 📞 SUPPORT RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Razorpay Docs**: https://razorpay.com/docs

## 🎉 SUCCESS INDICATORS

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Users can register and login
- ✅ Products display correctly
- ✅ Cart functionality works
- ✅ Payments process successfully
- ✅ No console errors
- ✅ Mobile version works
- ✅ All features are functional