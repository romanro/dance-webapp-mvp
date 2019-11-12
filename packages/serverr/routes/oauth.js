const passport = require('passport');
const { Router } = require('express');

const app = new Router();

app.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);
app.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/');
  }
);

exports.oauth = app;
