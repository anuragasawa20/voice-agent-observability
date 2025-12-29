# 🔒 Voice Agent Testing Dashboard

A comprehensive dashboard for testing and evaluating voice AI agents with security testing capabilities.

## Features

- 📞 **Test Voice Agents**: Create and run test scenarios against voice AI agents
- 📊 **Real-time Evaluation**: Automatic evaluation of agent performance using AI
- 🎯 **Security Testing**: Built-in security test scenarios and evaluation
- 📈 **Dashboard UI**: Beautiful, modern dashboard to view test results
- 💾 **Test History**: Track all tests with detailed results and transcripts
- 🎵 **Audio Recordings**: Listen to call recordings directly in the dashboard

## How It Works

The system follows an asynchronous flow where tests are initiated, calls are made, and results are evaluated automatically. Here's the complete sequence:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 1: INITIATION                                   │
└─────────────────────────────────────────────────────────────────────────────┘

    User
     │
     │ Fill form & click "Run Test"
     │
     ▼
┌──────────┐
│ Frontend │
└──────────┘
     │
     │ POST /webhook/test/run
     │ (phone_number, scenario, final_outcome)
     │
     ▼
┌──────────┐
│ Backend  │──┐
└──────────┘  │
     │        │ Save test to database (status: pending)
     │        │
     │        │ Create outbound call
     │        │
     │        ▼
     │    ┌──────┐
     │    │ VAPI │
     │    └──────┘
     │
     │ Return test_id & call_id
     │
     ▼
┌──────────┐
│ Frontend │──┐ Start polling for results
└──────────┘  │ (GET /webhook/tests/:id)
              │
              │ (continues in Phase 4)
              │

┌─────────────────────────────────────────────────────────────────────────────┐
│                      PHASE 2: CALL EXECUTION                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────┐
│ VAPI │
└──────┘
   │
   │ Make phone call
   │
   ▼
┌─────────────────────┐
│  Target Agent       │
│  (OpenAI GPT-4)     │
└─────────────────────┘
   │
   │ ◄─────────────────► Conversation happens
   │   (Real-time voice interaction)
   │
   │ Call ends
   │
   ▼
┌──────┐
│ VAPI │──┐
└──────┘  │ Webhook: Call ended
          │ (call_id, status)
          │
          ▼
     ┌──────────┐
     │ Backend  │
     └──────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 3: EVALUATION                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│ Backend  │
└──────────┘
   │
   │ Fetch call recording & transcript
   │ (via VAPI API)
   │
   ▼
┌──────┐
│ VAPI │──┐ Return transcript, audio URL, metadata
└──────┘  │
          │
          ▼
     ┌──────────┐
     │ Backend  │──┐ Save transcript to database
     └──────────┘  │
                   │
                   │ Evaluate transcript
                   │ (transcript + scenario + expected_outcome)
                   │
                   ▼
              ┌──────────────┐
              │  Gemini AI   │
              │  (Evaluator) │
              └──────────────┘
                   │
                   │ Analyze performance metrics:
                   │ • Task Completion
                   │ • Accuracy
                   │ • Security (for security tests)
                   │ • Empathy, Naturalness, Efficiency
                   │ • And more...
                   │
                   │ Return Pass/Fail result
                   │ (with detailed scores)
                   │
                   ▼
              ┌──────────┐
              │ Backend  │──┐ Update test result
              └──────────┘  │ (status: evaluated, scores, passed)
                            │

┌─────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 4: RESULTS DISPLAY                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│ Frontend │ (Polling from Phase 1)
└──────────┘
   │
   │ GET /webhook/tests/:id
   │
   ▼
┌──────────┐
│ Backend  │──┐ Return test result
└──────────┘  │ (with evaluation scores)
              │
              ▼
         ┌──────────┐
         │ Frontend │──┐ Display Pass/Fail & Scores
         └──────────┘  │ (Show detailed evaluation results)
                       │
                       ▼
                    User
```

### Key Components

1. **Frontend (Dashboard)**: User interface for creating tests and viewing results
2. **Backend (Express.js)**: Handles test creation, call orchestration, and result storage
3. **VAPI Platform**: Manages phone calls and provides transcript/recording APIs
4. **Target Agent (OpenAI GPT-4)**: The voice agent being tested - handles the actual conversation
5. **Gemini AI (Evaluator)**: Analyzes transcripts and evaluates agent performance

### Evaluation Process

When a call ends, the system:
1. Fetches the complete call transcript from VAPI
2. Sends the transcript along with the test scenario and expected outcomes to Gemini AI
3. Gemini evaluates the agent across multiple dimensions:
   - ✅ Task Completion
   - ✅ Accuracy
   - ✅ Security (for security tests)
   - ✅ Empathy, Naturalness, Efficiency
   - ✅ And more (see [Evaluation Framework](test-cases/EVALUATION_FRAMEWORK_README.md))
4. Stores comprehensive evaluation results in the database
5. Frontend polls and displays results with detailed scores

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
├── ecosystem.config.cjs  # PM2 configuration
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

