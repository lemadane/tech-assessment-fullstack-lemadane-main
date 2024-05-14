import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../common/utils';

export default async function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('-------------------notFoundMiddleware-------------------');
  const err = new ApiError('Not found', 404);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status).json({ message: err.message });
}
