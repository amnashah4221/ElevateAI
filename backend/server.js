import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectDB from './db/index.js';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";



connectDB();
const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
} );