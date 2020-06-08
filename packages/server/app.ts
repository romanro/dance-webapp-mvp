import bodyParser from 'body-parser';
import chalk from 'chalk';
import compression from 'compression';
import flash from 'connect-flash';
import cors = require('cors');
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import expressStatusMonitor from 'express-status-monitor';
import helmet from 'helmet';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

dotenv.config({ path: '.env.example' });

/**
 * Module dependencies.
 */
require('./config/passport');

const api = require('./routes/api');
const homeController = require('./controllers/home');
const adminController = require('./controllers/admin');

/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', err => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  );
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);

app.use(helmet());
app.use(cors())
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

/* app.use(
  '/',
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
); */

// Serve only the static files form the dist directory
app.use(
  express.static(
    path.join(__dirname, '..', '..', '..', 'packages', 'client', 'dist', 'webapp'),
    {
      maxAge: 31557600000
    }
  )
);

app.use(
  express.static(
    path.join(__dirname, '..', '..', '..', 'packages', 'admin', 'dist', 'admin'),
    {
      maxAge: 31557600000
    }
  )
);
// app.use(flash()); // TODO: needed?

/* App routes */
app.use('/api/v1', api);

/**
 * Cath-all admin route to angular admin
 */
app.get('/admin', (req, res, next) => {
  return adminController.admin(req, res, next);
});

/**
 * Cath-all route to angular app
 */
app.get('/*', (req, res, next) => {
  return homeController.app(req, res, next);
});

/**
 * Error Handler.
 */

const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  next(err)
}

const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  const message = (process.env.NODE_ENV === 'development') ? err.message : 'Server Error';
  const errorCode = err.status || 500;
  res.status(errorCode).json({ error: message });
}

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
