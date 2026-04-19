import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//route
export default app;
