import express from 'express';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

const app = express();

app.use(ErrorMiddleware);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});