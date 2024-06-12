import app from './app';
import { sequelize } from './config/database';

const port: number = 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
