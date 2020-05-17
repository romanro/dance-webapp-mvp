import { Request, Response, NextFunction } from "express";
const proxy = require('http-proxy-middleware');
const path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = (req: Request, res: Response) => {
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

const angularAssets = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'client', 'dist', 'webapp/index.html'),
    {
      maxAge: 31557600000
    }
  );
};

exports.app = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    return angularDev(req, res, next);
  }

  return angularAssets(req, res, next);
};
