import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { connectDB } from "./config/dbConnect.js";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

import path from 'path'; 
import { fileURLToPath } from 'url'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join( "../frontend/out"))); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
