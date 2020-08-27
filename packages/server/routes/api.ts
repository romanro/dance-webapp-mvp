import express, { Application, Request, Response, NextFunction } from "express";
import { checkAuth } from '../middleware/checkAuth';
import { checkMinRole } from "../middleware/checkMinRole";
import { EnumRole } from "../shared/enums";

const user = require('./user');
const account = require('./account');
const stars = require('./stars');
const figures = require('./figures');
const videos = require('./videos');
const admins = require('./admins');

const app: Application = express();

app.use('/', user);
app.use('/account', checkAuth, account);
app.use('/stars', checkAuth, stars);
app.use('/figures', checkAuth, figures);
app.use('/videos', checkAuth, videos);
app.use('/admins', [checkAuth, checkMinRole(EnumRole.admin)], admins);

module.exports = app;
