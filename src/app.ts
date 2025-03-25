import express from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import categoryRouter from './category/category-router';
const app = express();
app.use(express.json());
app.use('/categories', categoryRouter);

app.use(globalErrorHandler);

export default app;
