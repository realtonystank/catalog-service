import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from 'http-errors';
import logger from '../../config/logger';
import { Config } from '../../config';

export const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    const errorId = uuidv4();
    const isProduction = Config.NODE_ENV === 'production';
    const message = isProduction ? `An unexpected error occured.` : err.message;

    logger.error(message, {
        id: errorId,
        error: err.stack,
        path: req.path,
        method: req.method,
    });
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        errors: [
            {
                ref: errorId,
                type: err.name,
                msg: message,
                path: req.path,
                location: 'server',
                stack: isProduction ? null : err.stack,
            },
        ],
    });
};
