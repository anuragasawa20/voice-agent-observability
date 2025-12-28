# Deployment Guide - DigitalOcean

This guide covers deploying the Voice Agent Testing Dashboard on DigitalOcean with budget-friendly options.

## 💰 Cost Comparison

| Option | Monthly Cost | Setup Difficulty | Best For |
|--------|--------------|-------------------|----------|
| **DigitalOcean Droplet** | $4-6/month | Medium | Production, full control |
| **DigitalOcean App Platform** | $5-12/month | Easy | Quick deployment, auto-scaling |
| **Railway/Render** | $5-7/month | Very Easy | Development, quick testing |

## 🎯 Recommended: DigitalOcean Droplet ($4-6/month)

### Prerequisites
- DigitalOcean account
- Domain name (optional, can use IP address)
- GitHub repository with your code

### Step 1: Create Droplet

1. Go to [DigitalOcean](https://www.digitalocean.com/)
2. Click **Create** → **Droplets**
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic - Regular Intel with SSD ($4/month - 512MB RAM) or ($6/month - 1GB RAM recommended)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: SSH keys (recommended) or password
4. Click **Create Droplet**

### Step 2: Initial Server Setup

SSH into your droplet:
```bash
ssh root@your-droplet-ip
```

#### Update system and install Node.js
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install Git
apt install -y git
```

### Step 3: Clone and Setup Application

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/your-username/superbryn-proto.git
cd superbryn-proto

# Install dependencies
npm ci --only=production

# Create logs directory
mkdir -p logs

# Create .env file
nano .env
```

Add your environment variables:
```env
PORT=3000
NODE_ENV=production
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER_ID=your_phone_number_id
WEBHOOK_URL=https://your-domain.com/webhook
GEMINI_API_KEY=your_gemini_api_key
```

Save and exit (Ctrl+X, Y, Enter)

### Step 4: Start Application with PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown

# Check status
pm2 status
pm2 logs superbryn-proto
```

### Step 5: Configure Nginx

```bash
# Copy nginx config
cp nginx.conf /etc/nginx/sites-available/superbryn-proto

# Edit the config
nano /etc/nginx/sites-available/superbryn-proto
```

Update `your-domain.com` with your actual domain or remove server_name line if using IP.

```bash
# Enable site
ln -s /etc/nginx/sites-available/superbryn-proto /etc/nginx/sites-enabled/

# Remove default site (optional)
rm /etc/nginx/sites-enabled/default

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
```

### Step 6: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Check status
ufw status
```

### Step 7: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

### Step 8: Setup Auto-Deployment (Optional)

Create a GitHub Actions workflow or use the deploy script:

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🚀 Alternative: DigitalOcean App Platform ($5-12/month)

### Step 1: Create App

1. Go to DigitalOcean → **App Platform**
2. Click **Create App**
3. Connect your GitHub repository
4. Select the repository and branch

### Step 2: Configure Build Settings

- **Build Command**: `npm ci --only=production`
- **Run Command**: `node index.js`
- **HTTP Port**: `3000`

### Step 3: Add Environment Variables

Add all variables from `.env.example`:
- `VAPI_API_KEY`
- `VAPI_PHONE_NUMBER_ID`
- `WEBHOOK_URL`
- `GEMINI_API_KEY`
- `NODE_ENV=production`
- `PORT=3000`

### Step 4: Deploy

Click **Deploy** and wait for deployment to complete.

## 📊 Monitoring & Maintenance

### Check Application Status
```bash
pm2 status
pm2 logs superbryn-proto
pm2 monit
```

### Restart Application
```bash
pm2 restart superbryn-proto
```

### Update Application
```bash
cd /var/www/superbryn-proto
git pull
npm ci --only=production
pm2 restart superbryn-proto
```

### Backup Database
```bash
# Create backup
cp database/database.sqlite database/database.sqlite.backup

# Or use cron for automatic backups
crontab -e
# Add: 0 2 * * * cp /var/www/superbryn-proto/database/database.sqlite /var/www/superbryn-proto/database/database.sqlite.backup.$(date +\%Y\%m\%d)
```

## 🔧 Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs superbryn-proto --lines 50

# Check if port is in use
netstat -tulpn | grep 3000

# Check environment variables
pm2 env 0
```

### Nginx errors
```bash
# Check nginx logs
tail -f /var/log/nginx/error.log

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
```

### Database issues
```bash
# Check database file permissions
ls -la database/

# Fix permissions if needed
chmod 644 database/database.sqlite
```

## 💡 Cost Optimization Tips

1. **Use smallest droplet** ($4/month) if traffic is low
2. **Monitor usage** with DigitalOcean monitoring
3. **Use Cloudflare** (free) for CDN and DDoS protection
4. **Enable DO Spaces** ($5/month) for file storage if needed
5. **Use Let's Encrypt** (free SSL certificates)

## 🔒 Security Checklist

- [ ] Change default SSH port (optional)
- [ ] Setup firewall (UFW)
- [ ] Use SSH keys instead of passwords
- [ ] Enable SSL/HTTPS
- [ ] Keep system updated: `apt update && apt upgrade`
- [ ] Use strong environment variable values
- [ ] Regular backups of database
- [ ] Monitor logs for suspicious activity

## 📞 Support

- **DigitalOcean Docs**: https://docs.digitalocean.com/
- **PM2 Docs**: https://pm2.keymetrics.io/
- **Nginx Docs**: https://nginx.org/en/docs/

## 🎉 You're Done!

Your application should now be accessible at:
- `http://your-droplet-ip` (if using IP)
- `https://your-domain.com` (if using domain)

Visit the URL in your browser to see your dashboard!

