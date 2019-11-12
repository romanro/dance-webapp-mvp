const { Router } = require('express');
const multer = require('multer');
const lusca = require('lusca');
const path = require('path');

const apiController = require('../controllers/api');
const passportConfig = require('../config/passport');

const upload = multer({ dest: path.join(__dirname, '../uploads') });

const app = new Router();

app.get('/', apiController.getApi);
app.get(
  '/facebook',
  passportConfig.isAuthenticated,
  passportConfig.isAuthorized,
  apiController.getFacebook
);
app.get('/upload', lusca({ csrf: true }), apiController.getFileUpload);
app.post(
  '/upload',
  upload.single('myFile'),
  lusca({ csrf: true }),
  apiController.postFileUpload
);

exports.api = app;
