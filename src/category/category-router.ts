import express, { Request } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { Response } from "express-serve-static-core";
const router = express.Router();
const categoryController = new CategoryController();

router.post("/", categoryValidator, (req: Request, res: Response) =>
    categoryController.create(req, res),
);

export default router;
