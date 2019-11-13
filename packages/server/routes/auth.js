const { Router } = require('express');

const passportConfig = require('../config/passport');
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

const app = new Router();

// app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
// app.get('/logout', userController.logout);
// app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
// app.get('/signup', userController.getSignup);
// app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get(
  '/account/verify',
  passportConfig.isAuthenticated,
  userController.getVerifyEmail
);
app.get(
  '/account/verify/:token',
  passportConfig.isAuthenticated,
  userController.getVerifyEmailToken
);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post(
  '/account/profile',
  passportConfig.isAuthenticated,
  userController.postUpdateProfile
);
app.post(
  '/account/password',
  passportConfig.isAuthenticated,
  userController.postUpdatePassword
);
app.post(
  '/account/delete',
  passportConfig.isAuthenticated,
  userController.postDeleteAccount
);
app.get(
  '/account/unlink/:provider',
  passportConfig.isAuthenticated,
  userController.getOauthUnlink
);

exports.auth = app;
