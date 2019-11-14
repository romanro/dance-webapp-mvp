const { Router } = require('express');
const userController = require('../controllers/user');

const app = new Router();

app.get('/verify', userController.getVerifyEmail);
app.get('/verify/:token', userController.getVerifyEmailToken);
app.post('/profile', userController.postUpdateProfile);
app.post('/password', userController.postUpdatePassword);
app.post('/delete', userController.postDeleteAccount);
app.get('/unlink/:provider', userController.getOauthUnlink);

module.exports = app;
