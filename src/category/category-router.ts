import express from 'express';
import { CategoryController } from './Category-controller';
import categoryValidator from './category-validator';
import { CategoryService } from './Category-service';
import logger from '../config/logger';
import { asyncWrapper } from '../common/middlewares/asyncWrapper';
import authenticate from '../common/middlewares/authenticate';
import { canAccess } from '../common/middlewares/canAccess';
import { Roles } from '../common/constants';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    '/',
    authenticate,
    canAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(categoryController.create),
);

export default router;
