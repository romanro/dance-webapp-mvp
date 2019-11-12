exports.redirectOnLogin = (req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/oauth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.originalUrl;
  } else if (
    req.user &&
    (req.path === '/account' || req.path.match(/^\/api/))
  ) {
    req.session.returnTo = req.originalUrl;
  }
  next();
};
