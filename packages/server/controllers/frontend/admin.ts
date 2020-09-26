import { NextFunction, Request, Response } from 'express';

import proxy from 'http-proxy-middleware';
import path from 'path';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const angularAdminAssets = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.join(__dirname, '..', '..', '..', '..', 'admin', 'dist', 'admin/index.html'),
    {
      maxAge: 31557600000
    }
  );
};

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production' && angularDev) {
    return angularDev(req, res, next);
  }

  return angularAdminAssets(req, res, next);
};

export default admin;
