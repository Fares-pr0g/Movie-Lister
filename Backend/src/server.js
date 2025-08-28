import express from 'express';
import dotenv from 'dotenv';
import movieRouter from './routes/movieRoutes.js';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js'
import User from './models/UserModel.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true //allow cookies to travel
}));

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  name: 'movieapp.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/movies', movieRouter);
app.use('/api/auth', authRouter);

connectDB().then(
    () => {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
);
