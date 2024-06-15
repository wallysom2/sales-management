import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

interface JwtPayload {
  id: number;
}

const verifyToken = (token: string, secret: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    return null;
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.headers['x-access-token'] as string;
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const payload = verifyToken(token, secretKey);
  if (!payload) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.userId = payload.id;
  next();
};
