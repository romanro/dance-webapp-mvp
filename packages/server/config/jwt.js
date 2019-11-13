const jwt = require('jsonwebtoken');

exports.JWT_SECRET = 'secret';

exports.jwtConfig = {
  issuer: 'sso.danskilll.com',
  audience: 'dansekill.com'
};

exports.getToken = payload =>
  jwt.sign(payload, exports.JWT_SECRET, {
    expiresIn: '15m',
    ...exports.jwtConfig
  });
