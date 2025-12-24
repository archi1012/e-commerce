#!/bin/bash

echo "🚀 Deploying E-commerce App to Vercel..."

# Deploy Backend
echo "📦 Deploying Backend..."
cd backend
vercel --prod
BACKEND_URL=$(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*')
echo "Backend deployed to: $BACKEND_URL"

# Deploy Frontend with Backend URL
echo "🎨 Deploying Frontend..."
cd ../frontend
vercel --prod -e VITE_API_URL="$BACKEND_URL/api"
echo "Frontend deployed successfully!"

echo "✅ Deployment Complete!"