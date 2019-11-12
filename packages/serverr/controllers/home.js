const proxy = require('http-proxy-middleware');
const express = require('express');
const path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

const angularDev = proxy({
  target: 'http://localhost:4200',
  changeOrigin: true,
  ws: true
});

const angularAssets = express.static(
  path.join(__dirname, '..', '..', 'client', 'dist', 'webapp'),
  {
    maxAge: 31557600000
  }
);

exports.video = (_, res) =>
  res.render('app', {
    title: 'Video lab POC'
  });

exports.app = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return angularDev(req, res, next);
  }

  return angularAssets(req, res, next);
};
