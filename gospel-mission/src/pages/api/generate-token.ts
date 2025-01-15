import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // Handle the case when the secret is not defined
    return res.status(500).json({ error: 'JWT_SECRET is not defined' });
  }

  const token = jwt.sign({ data: 'example' }, secret, { expiresIn: '1h' });
  res.status(200).json({ token });
}
