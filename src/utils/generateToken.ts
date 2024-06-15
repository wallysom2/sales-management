import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('Missing secret key');
}

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '24h' });
};