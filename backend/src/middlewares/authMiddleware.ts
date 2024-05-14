// authMiddleware

import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler';
import { verifyAccessToken } from '../common/tokens';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw { status:401, message: 'Unauthorized' }
    }
    if (token?.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const { user, role } = (await verifyAccessToken(token)) as {
      user: string;
      role: string;
    };
    Object.assign(req, { user, role });
    next();
  } catch (err) {
    next(err);
  }
}
