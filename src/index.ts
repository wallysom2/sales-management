import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import authRoutes from './routes/authRoutes';
import salesRoutes from './routes/salesRoutes';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
