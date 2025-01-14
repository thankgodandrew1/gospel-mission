import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Issue a JWT with a fixed payload (e.g., "role: client")
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { role: 'client' }, // Payload
      secret, // Secret key
      { expiresIn: '1h' } // Token expiry
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
