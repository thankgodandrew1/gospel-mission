import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default_secret_key';

export const signToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
