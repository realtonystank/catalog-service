import express from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello from catalog service' });
});

app.use(globalErrorHandler);

export default app;
