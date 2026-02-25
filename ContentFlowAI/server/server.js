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

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'ContentFlow AI server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 ContentFlow AI server running on http://localhost:${PORT}`);
});
