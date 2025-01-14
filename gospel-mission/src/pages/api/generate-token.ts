// src/pages/api/generate-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: 'example' }, secret, { expiresIn: '1h' });
  res.status(200).json({ token });
}
