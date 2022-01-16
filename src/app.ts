import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import { setupRoute } from './config/route';
import errorMiddleware from './middlewares/error';

const app = express();
app.use(cors());
app.use(express.json());

setupRoute(app);
app.use(errorMiddleware);

export async function init() {
    await connectDatabase();
}

export default app;
