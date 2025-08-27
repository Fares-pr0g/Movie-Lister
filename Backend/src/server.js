import express from 'express';
import dotenv from 'dotenv';
import movieRouter from './routes/movieRoutes.js';
import { connectDB } from './config/db.js';
import router from './routes/userRoutes.js';
import cors from 'cors';


dotenv.config();

const app= express();

app.use(cors({
    origin: 'http://localhost:5173',
}));

const PORT= process.env.PORT;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

//middleware

app.use(express.json());   
app.use(express.urlencoded({extended:true}));

app.use('/api/movies', movieRouter);
app.use('/api/users', router);

connectDB().then(
    () => {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
);
