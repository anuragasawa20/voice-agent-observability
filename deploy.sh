#!/bin/bash

# Deployment script for DigitalOcean Droplet
# Run this script on your server after initial setup

set -e

echo "🚀 Starting deployment..."

# Navigate to app directory
cd /var/www/superbryn-proto || exit

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install/update dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Create logs directory if it doesn't exist
mkdir -p logs

# Restart application with PM2
echo "🔄 Restarting application..."
pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

echo "✅ Deployment complete!"
echo "📊 Check status with: pm2 status"
echo "📝 View logs with: pm2 logs superbryn-proto"

