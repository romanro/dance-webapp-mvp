const proxy = require('http-proxy-middleware');
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

const angularDev =
  process.env.NODE_ENV === 'production'
    ? null
    : proxy({
        target: 'http://localhost:4200',
        changeOrigin: true,
        ws: true
      });

const angularAssets = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'client', 'dist', 'webapp/index.html'),
    {
      maxAge: 31557600000
    }
  );
};

exports.app = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return angularDev(req, res, next);
  }

  return angularAssets(req, res, next);
};
