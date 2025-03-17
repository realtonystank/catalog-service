import express from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Catalog service');
});

app.use(globalErrorHandler);

export default app;
