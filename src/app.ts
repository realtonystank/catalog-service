import express from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import categoryRouter from './category/category-router';
const app = express();

// app.get('/', (req, res) => {
//     res.json({ message: 'Hello from catalog service' });
// });
app.use('/', categoryRouter);

app.use(globalErrorHandler);

export default app;
