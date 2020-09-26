import express, { Application } from "express";
import { checkAuth } from '../middleware/checkAuth';
import { checkMinRole } from "../middleware/checkMinRole";
import { EnumRole } from "../shared/enums";

import user from './user';
import account from './account';
import stars from './stars';
import figures from './figures';
import videos from './videos';
import admins from './admins';

const app: Application = express();

app.use('/', user);
app.use('/account', checkAuth, account);
app.use('/stars', checkAuth, stars);
app.use('/figures', checkAuth, figures);
app.use('/videos', checkAuth, videos);
app.use('/admins', [checkAuth, checkMinRole(EnumRole.admin)], admins);

export default app;