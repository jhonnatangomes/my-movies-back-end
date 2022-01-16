/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log('Error middleware: ', err);
    return res.sendStatus(500);
}
