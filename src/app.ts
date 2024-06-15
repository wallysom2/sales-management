import express, { Application } from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import salesRoutes from './routes/salesRoutes';

const app: Application = express();
dotenv.config();

app.use(bodyParser.json());

app.use('/sales', salesRoutes);
app.use('/', authRoutes);

export default app;
