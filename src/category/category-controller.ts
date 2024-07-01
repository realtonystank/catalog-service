import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";
import mongoose from "mongoose";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;

        const category = await this.categoryService.create({
            name,
            priceConfiguration,
            attributes,
        });

        this.logger.info("Created cateogry", { id: category._id });

        return res.json({ id: category._id });
    }

    async fetchAll(req: Request, res: Response) {
        const allCategories = await this.categoryService.fetchAll();

        return res.json({ data: allCategories });
    }

    async fetchById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        const category = await this.categoryService.fetchById(
            id as unknown as mongoose.Types.ObjectId,
        );
        return res.json({ data: category });
    }

    async updateCategoryById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        const { name, priceConfiguration, attributes } = req.body as Category;

        await this.categoryService.updateCategoryById(
            id as unknown as mongoose.Types.ObjectId,
            { name, priceConfiguration, attributes },
        );

        return res.status(204).send();
    }

    async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        await this.categoryService.deleteCategoryById(
            id as unknown as mongoose.Types.ObjectId,
        );

        return res.status(204).send();
    }
}
