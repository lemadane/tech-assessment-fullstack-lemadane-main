import { NextFunction, Request, Response } from "express"

export default async function contentTypeJson(req: Request, res: Response, next: NextFunction) {
  console.log('-------------------contentTypeJson-------------------');
  req.headers['Content-Type'] = 'application/json';
  res.setHeader('Content-Type', 'application/json');
  next();
}
