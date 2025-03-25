import { Request, Response, NextFunction } from 'express';

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ msg: 'success' });
        } catch (err) {
            next(new Error('Internal server error'));
        }
    }
}
