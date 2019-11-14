const { Router } = require('express');
const userController = require('../controllers/user');

const app = new Router();

// JWT done
app.get('/verify', userController.getVerifyEmail);
app.get('/verify/:token', userController.getVerifyEmailToken);

// JWT not done
app.post('/password', userController.postUpdatePassword);
app.post('/profile', userController.postUpdateProfile);
app.post('/delete', userController.postDeleteAccount);
app.get('/unlink/:provider', userController.getOauthUnlink);

module.exports = app;
