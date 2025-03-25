import express, { NextFunction, Request, Response } from 'express';
import { CategoryController } from './Category-controller';
import categoryValidator from './category-validator';
import { CategoryService } from './Category-service';
import logger from '../config/logger';
const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
    categoryValidator,
    (req: Request, res: Response, next: NextFunction) =>
        categoryController.create(req, res, next),
);

export default router;
