import { NextFunction, Request, Response } from 'express';

import proxy from 'http-proxy-middleware';
import path from 'path';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  res.render('home', {
    title: 'Home'
  });
};

const angularDev =
  process.env.NODE_ENV === 'production'
    ? null
    : proxy({
      target: 'http://localhost:4200',
      changeOrigin: true,
      ws: true
    });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const angularAssets = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.join(__dirname, '..', '..', '..', '..', 'client', 'dist', 'webapp/index.html'),
    {
      maxAge: 31557600000
    }
  );
};

const app = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production' && angularDev) {
    return angularDev(req, res, next);
  }

  return angularAssets(req, res, next);
};


export default app;
