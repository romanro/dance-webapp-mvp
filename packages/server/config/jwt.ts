import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'secret';

export const jwtConfig = {
  issuer: 'sso.danskilll.com',
  audience: 'dansekill.com'
};

export const getToken = (payload: any) =>
  jwt.sign(payload, exports.JWT_SECRET, {
    expiresIn: '15m',
    ...exports.jwtConfig
  });
