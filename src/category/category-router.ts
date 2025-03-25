import express from 'express';
import { CategoryController } from './Category-controller';
import categoryValidator from './category-validator';
import { CategoryService } from './Category-service';
import logger from '../config/logger';
import { asyncWrapper } from '../common/middlewares/asyncWrapper';
import authenticate from '../common/middlewares/authenticate';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
    authenticate,
    categoryValidator,
    asyncWrapper(categoryController.create),
);

export default router;
