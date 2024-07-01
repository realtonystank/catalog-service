import express, { NextFunction, Request, RequestHandler } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { Response } from "express-serve-static-core";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";
import { Roles } from "../common/constants";
import { canAccess } from "../common/middlewares/canAccess";
const router = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(
        (req: Request, res: Response, next: NextFunction) =>
            void categoryController.create(req, res, next),
    ),
);

router.get(
    "/",
    asyncWrapper(
        (req: Request, res: Response) =>
            void categoryController.fetchAll(req, res),
    ),
);

router.get(
    "/:id",
    asyncWrapper(
        (req: Request, res: Response, next: NextFunction) =>
            void categoryController.fetchById(req, res, next),
    ),
);

router.patch(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(
        (req: Request, res: Response, next: NextFunction) =>
            void categoryController.updateCategoryById(req, res, next),
    ),
);

export default router;
