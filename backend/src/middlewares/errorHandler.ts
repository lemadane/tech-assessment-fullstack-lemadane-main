import { Request, Response, NextFunction } from 'express';

export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('-------------------errorHandler-------------------')
  if (err.message.includes('Unique constraint')) {
    return res.status(400).json({
      message: 'Something went wrong',
      detail: 'Unique key error.',
    });
  }
  console.log({ errStatus: err?.status });
  res.status(err?.status || 520).json({
    message: 'Something went wrong',
    detail: err?.message || 'Internal server error',
  });
}
