import express, { Request, Response, NextFunction } from "express";
import { postLogin, postSignup, getReset, postReset, postForgot, refreshToken } from '../controllers/user';
import { checkRefreshToken } from '../middleware/checkAuth';

const router = express.Router();


router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/reset/:token', getReset);
router.post('/reset/:token', postReset);
router.post('/forgot', postForgot);
router.post("/refreshToken/:refresh_token", checkRefreshToken, refreshToken);

module.exports = router;