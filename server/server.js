import express from 'express';
const app = express();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

//Configurations
import { connectDB } from './config/db.js';
connectDB();

//Middlewares
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) => { res.send("Server working") });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})