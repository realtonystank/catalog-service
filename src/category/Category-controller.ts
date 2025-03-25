import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { Category } from './category-types';
import { CategoryService } from './Category-service';
import { Logger } from 'winston';

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;

        try {
            const category = await this.categoryService.create({
                name,
                priceConfiguration,
                attributes,
            });
            this.logger.info('Created category', { id: category._id });
            res.json({ id: category._id });
        } catch (err) {
            next(err);
        }
    }
}
