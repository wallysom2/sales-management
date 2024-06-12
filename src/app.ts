import express, { Application } from 'express';
import bodyParser from 'body-parser';
// import authRoutes from './routes/authRoutes';
// import salesRoutes from './routes/salesRoutes';

const app: Application = express();

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use('/sales', salesRoutes);
// app.use('/auth', authRoutes);
// app.use('/sales', salesRoutes);

export default app;
