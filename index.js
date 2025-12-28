import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
import webhookRoutes from './routes/webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// JSON parsing with better error handling
app.use(express.json({
    strict: true
}));

// Error handler for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('JSON Parse Error:', err.message);
        console.error('Request URL:', req.url);
        console.error('Request Method:', req.method);
        return res.status(400).json({
            message: 'Invalid JSON in request body',
            error: err.message,
            hint: 'Make sure all property names and strings use double quotes, not single quotes'
        });
    }
    next(err);
});

app.use(express.urlencoded({ extended: true }));



app.use('/webhook', webhookRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});