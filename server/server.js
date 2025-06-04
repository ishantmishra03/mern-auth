import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { connectDB } from './config/db.js';

// Initialize app
const app = express();

// Connect to DB
connectDB();

// Allowed frontend origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send("Server working ✅");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
