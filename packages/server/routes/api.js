const { Router } = require('express');
// const multer = require('multer');
// const lusca = require('lusca');
// const path = require('path');
const passport = require('passport');
const userController = require('../controllers/user');
// const apiController = require('../controllers/api');
// const passportConfig = require('../config/passport');
const account = require('./account');
// const upload = multer({ dest: path.join(__dirname, '../uploads') });

const app = new Router();

// app.get('/', apiController.getApi);
// app.get(
//   '/facebook',
//   passportConfig.isAuthenticated,
//   passportConfig.isAuthorized,
//   apiController.getFacebook
// );
// app.get('/upload', lusca({ csrf: true }), apiController.getFileUpload);
// app.post(
//   '/upload',
//   upload.single('myFile'),
//   lusca({ csrf: true }),
//   apiController.postFileUpload
// );

app.post('/login', userController.postLogin);

app.post('/signup', userController.postSignup);

app.get('/logout', userController.logout);

app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);

app.post('/forgot', userController.postForgot);

app.use('/account', passport.authenticate('jwt', { session: false }), account);
exports.api = app;
