import { JwtPayload } from 'jsonwebtoken';

declare module 'next' {
  interface NextApiRequest {
    user?: string | JwtPayload; // Adjust the type based on the token payload
  }
}
