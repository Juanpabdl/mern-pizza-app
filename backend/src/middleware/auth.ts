import { auth } from 'express-oauth2-jwt-bearer';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
    }
  }
}

const audience = process.env.AUTH0_AUDIENCE;
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;

if (!audience || !issuerBaseURL) {
  throw new Error('Missing required environment variables: AUTH0_AUDIENCE or AUTH0_ISSUER_BASE_URL');
}

export const jwtCheck = auth({
  audience,
  issuerBaseURL,
  tokenSigningAlg: 'RS256',
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization }= req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.decode(token!) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    if (!auth0Id) {
      return res.status(400).json({ message: "Invalid token: missing auth0Id" });
    }
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return res.sendStatus(401);
  }
}