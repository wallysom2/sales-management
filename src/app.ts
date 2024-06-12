import express, { Application } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
