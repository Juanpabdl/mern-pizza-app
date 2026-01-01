import { auth } from 'express-oauth2-jwt-bearer';

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
