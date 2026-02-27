import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRoute } from './routes/generate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', generateRoute);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'ContentFlow AI server is running' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        details: err.message || 'An unexpected error occurred'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 ContentFlow AI server running on http://localhost:${PORT}`);
});
