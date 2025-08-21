import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

import { connectDB } from "./config/dbConnect.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipes', recipeRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/out')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});