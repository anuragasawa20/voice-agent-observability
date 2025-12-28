# 🔒 Voice Agent Testing Dashboard

A comprehensive dashboard for testing and evaluating voice AI agents with security testing capabilities.

## Features

- 📞 **Test Voice Agents**: Create and run test scenarios against voice AI agents
- 📊 **Real-time Evaluation**: Automatic evaluation of agent performance using AI
- 🎯 **Security Testing**: Built-in security test scenarios and evaluation
- 📈 **Dashboard UI**: Beautiful, modern dashboard to view test results
- 💾 **Test History**: Track all tests with detailed results and transcripts
- 🎵 **Audio Recordings**: Listen to call recordings directly in the dashboard

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your API keys
nano .env

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## Deployment

### 🚀 Quick Deploy Options

**Budget-Friendly Hosting ($4-12/month):**

1. **DigitalOcean Droplet** ($4-6/month) - [Full Guide](DEPLOYMENT.md)
2. **DigitalOcean App Platform** ($5-12/month) - [Quick Start](QUICK_START.md)
3. **Railway.app** ($5/month) - [Quick Start](QUICK_START.md)
4. **Render.com** ($7/month) - [Quick Start](QUICK_START.md)

### Recommended: DigitalOcean Droplet

```bash
# On your fresh Ubuntu 22.04 droplet
curl -fsSL https://raw.githubusercontent.com/your-repo/setup-server.sh | bash

# Or follow the detailed guide
# See DEPLOYMENT.md for complete instructions
```

## Environment Variables

Required environment variables (see `env.example`):

```env
PORT=3000
NODE_ENV=production
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER_ID=your_phone_number_id
WEBHOOK_URL=https://your-domain.com/webhook
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
superbryn-proto/
├── public/              # Frontend files (HTML, CSS, JS)
├── routes/              # API routes
├── services/            # Business logic (evaluator, prompt builder)
├── database/            # SQLite database and queries
├── test-cases/          # Test case examples
├── vapi-agent-config/   # Agent configuration files
├── Dockerfile           # Docker configuration
├── ecosystem.config.js  # PM2 configuration
├── nginx.conf          # Nginx reverse proxy config
└── deploy.sh           # Deployment script
```

## API Endpoints

- `POST /webhook/test/run` - Create and run a new test
- `GET /webhook/tests` - Get all tests
- `GET /webhook/tests/:id` - Get single test details
- `POST /webhook/get-call-recordings` - Fetch and evaluate call recordings

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (better-sqlite3)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **APIs**: VAPI, Google Gemini
- **Process Manager**: PM2
- **Web Server**: Nginx

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production start
npm start

# PM2 management
npm run pm2:start
npm run pm2:restart
npm run pm2:stop
```

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete deployment instructions
- [Quick Start](QUICK_START.md) - Fast deployment options
- [Test Cases](test-cases/) - Example test scenarios

## Cost Breakdown

| Component | Monthly Cost |
|-----------|--------------|
| DigitalOcean Droplet (1GB) | $6 |
| Domain (optional) | $0-15 |
| SSL Certificate | Free (Let's Encrypt) |
| **Total** | **$6-21/month** |

## Security

- Environment variables for sensitive data
- SQLite database with proper file permissions
- Nginx reverse proxy with SSL support
- Firewall configuration (UFW)
- PM2 process management for reliability

## License

ISC

## Support

For deployment issues, see:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [QUICK_START.md](QUICK_START.md) - Quick deployment options

---

**Made with ❤️ for testing voice AI agents**

