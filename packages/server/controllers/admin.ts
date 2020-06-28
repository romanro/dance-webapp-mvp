import { NextFunction, Request, Response } from 'express';

const proxy = require('http-proxy-middleware');
const path = require('path');

/**
 * GET /
 * Admin.
 */

const angularDev =
  process.env.NODE_ENV === 'production'
    ? null
    : proxy('/admin', {
      target: 'http://localhost:4401',
      changeOrigin: true,
      ws: true
    });

const angularAdminAssets = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.join(__dirname, '..', '..', '..', 'admin', 'dist', 'admin/index.html'),
    {
      maxAge: 31557600000
    }
  );
};

exports.admin = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    return angularDev(req, res, next);
  }

  return angularAdminAssets(req, res, next);
};
