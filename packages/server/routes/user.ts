import express, { Request, Response, NextFunction } from "express";
import { postLogin, postSignup, getReset, postReset, postForgot, refreshToken } from '../controllers/user';
import { checkRefreshToken } from '../middleware/checkAuth';
import asyncHandler from 'express-async-handler';

const router = express.Router();


router.post('/login', asyncHandler(postLogin));
router.post('/signup', asyncHandler(postSignup));
router.get('/reset/:token', asyncHandler(getReset));
router.post('/reset/:token', asyncHandler(postReset));
router.post('/forgot', asyncHandler(postForgot));
router.post("/refreshToken/:refresh_token", checkRefreshToken, asyncHandler(refreshToken));

module.exports = router;