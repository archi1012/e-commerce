# WINGER E-commerce Environment Variables Guide

## 🔐 SECURITY RULES
- NEVER commit .env files to Git
- Use different keys for development and production
- Keep secrets in deployment platform dashboards
- Use strong, random secrets (32+ characters)

## 📱 FRONTEND VARIABLES (Vercel)

### Required Variables:
```
VITE_API_URL=https://your-backend.railway.app/api
VITE_RAZORPAY_KEY_ID=rzp_live_your_key
```

### Optional Variables:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APP_NAME=WINGER
VITE_APP_VERSION=1.0.0
```

### Local Development (.env.local):
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_9WaeLLJnOFJCBz
```

## 🖥️ BACKEND VARIABLES (Railway)

### Critical Variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/winger_ecommerce
JWT_SECRET=your-32-character-minimum-secret-key
SESSION_SECRET=your-32-character-minimum-session-key
FRONTEND_URL=https://your-frontend.vercel.app
```

### Payment Variables:
```
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret_key
```

### OAuth Variables (if using):
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=https://your-backend.railway.app/api/auth/google/callback
```

## 🔑 HOW TO GENERATE SECRETS

### JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Session Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📋 DEPLOYMENT CHECKLIST

### Before Deployment:
- [ ] All secrets generated and stored securely
- [ ] MongoDB Atlas database created and accessible
- [ ] Razorpay account set up with live keys
- [ ] Google OAuth configured (if using)
- [ ] Environment variables added to deployment platforms

### After Deployment:
- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Test payment flow
- [ ] Check error handling
- [ ] Monitor logs for issues