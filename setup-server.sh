#!/bin/bash

# Server setup script for DigitalOcean Droplet
# Run this as root on a fresh Ubuntu 22.04 droplet

set -e

echo "🚀 Starting server setup..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
apt install -y nginx

# Install Git
echo "📦 Installing Git..."
apt install -y git

# Install build tools for better-sqlite3
echo "📦 Installing build dependencies..."
apt install -y python3 make g++

# Setup firewall
echo "🔥 Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /var/www

# Display versions
echo ""
echo "✅ Setup complete!"
echo ""
echo "Installed versions:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo ""
echo "Next steps:"
echo "1. Clone your repository: cd /var/www && git clone <your-repo-url>"
echo "2. Navigate to app: cd /var/www/superbryn-proto"
echo "3. Install dependencies: npm ci --only=production"
echo "4. Setup .env file: cp env.example .env && nano .env"
echo "5. Start app: pm2 start ecosystem.config.cjs && pm2 save && pm2 startup"
echo "6. Setup Nginx: cp nginx.conf /etc/nginx/sites-available/superbryn-proto"
echo "7. Enable site: ln -s /etc/nginx/sites-available/superbryn-proto /etc/nginx/sites-enabled/"
echo "8. Restart Nginx: systemctl restart nginx"

