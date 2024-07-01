import express, { NextFunction, Request } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { Response } from "express-serve-static-core";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
const router = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    categoryValidator,
    asyncWrapper(
        (req: Request, res: Response, next: NextFunction) =>
            void categoryController.create(req, res, next),
    ),
);

export default router;
