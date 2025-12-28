# 🚀 Quick Start - DigitalOcean Deployment

## Option 1: DigitalOcean Droplet (Recommended - $4-6/month)

### One-Command Setup Script

After creating your droplet and SSH'ing in, run:

```bash
# Download and run setup script
curl -fsSL https://raw.githubusercontent.com/your-repo/setup.sh | bash
```

Or manually follow these steps:

### Step 1: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 and Nginx
npm install -g pm2
apt install -y nginx git

# Verify
node --version
npm --version
```

### Step 2: Clone Your Repository

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/your-username/superbryn-proto.git
cd superbryn-proto
```

### Step 3: Setup Environment

```bash
# Copy example env file
cp env.example .env

# Edit with your values
nano .env
```

Required variables:
- `VAPI_API_KEY` - Your VAPI API key
- `VAPI_PHONE_NUMBER_ID` - Your VAPI phone number ID
- `WEBHOOK_URL` - Your public URL (e.g., `https://your-domain.com/webhook`)
- `GEMINI_API_KEY` - Your Google Gemini API key

### Step 4: Install & Start

```bash
# Install dependencies
npm ci --only=production

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions

# Check status
pm2 status
```

### Step 5: Setup Nginx

```bash
# Copy nginx config
cp nginx.conf /etc/nginx/sites-available/superbryn-proto

# Edit domain (or remove server_name for IP access)
nano /etc/nginx/sites-available/superbryn-proto

# Enable site
ln -s /etc/nginx/sites-available/superbryn-proto /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default  # Remove default

# Test and restart
nginx -t
systemctl restart nginx
```

### Step 6: Setup Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

### Step 7: SSL (Optional)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## Option 2: DigitalOcean App Platform ($5-12/month)

1. Go to DigitalOcean → **App Platform**
2. **Create App** → Connect GitHub
3. Select your repository
4. Configure:
   - **Build Command**: `npm ci --only=production`
   - **Run Command**: `node index.js`
   - **HTTP Port**: `3000`
5. Add environment variables (from `env.example`)
6. Click **Deploy**

## Option 3: Railway.app ($5/month)

1. Go to [Railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. Select repository
4. Add environment variables
5. Deploy automatically

## Option 4: Render.com ($7/month)

1. Go to [Render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. Configure:
   - **Build Command**: `npm ci --only=production`
   - **Start Command**: `node index.js`
4. Add environment variables
5. Deploy

## 🔧 Maintenance Commands

```bash
# View logs
pm2 logs superbryn-proto

# Restart app
pm2 restart superbryn-proto

# Update app
cd /var/www/superbryn-proto
git pull
npm ci --only=production
pm2 restart superbryn-proto

# Check status
pm2 status
pm2 monit
```

## 📊 Cost Breakdown

| Service | Monthly Cost | Setup Time |
|---------|--------------|------------|
| DigitalOcean Droplet (512MB) | $4 | 15 min |
| DigitalOcean Droplet (1GB) | $6 | 15 min |
| DigitalOcean App Platform | $5-12 | 5 min |
| Railway.app | $5 | 5 min |
| Render.com | $7 | 5 min |

## ✅ Verification

After deployment, visit:
- `http://your-droplet-ip` (if using IP)
- `https://your-domain.com` (if using domain)

You should see the dashboard!

## 🆘 Troubleshooting

**App won't start?**
```bash
pm2 logs superbryn-proto --lines 50
```

**Port already in use?**
```bash
netstat -tulpn | grep 3000
```

**Nginx errors?**
```bash
tail -f /var/log/nginx/error.log
nginx -t
```

## 📝 Next Steps

1. Setup domain name (optional)
2. Configure SSL certificate
3. Setup automatic backups
4. Monitor with PM2: `pm2 monit`

