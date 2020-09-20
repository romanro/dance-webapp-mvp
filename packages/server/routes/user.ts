import express from "express";
import { postLogin, postSignup, getReset, postReset, postForgot, refreshToken } from '../controllers/user';
import { checkRefreshToken } from '../middleware/checkAuth';
import asyncHandler from 'express-async-handler';
import { validate } from "../middleware/validation";
import { rules_login, rules_signup } from "../middleware/rules/users";

const router = express.Router();


router.post('/login', rules_login, validate, asyncHandler(postLogin));
router.post('/signup', rules_signup,  validate, asyncHandler(postSignup));
router.get('/reset/:token', asyncHandler(getReset));
router.post('/reset/:token', asyncHandler(postReset));
router.post('/forgot', asyncHandler(postForgot));
router.post("/refreshToken/:refresh_token", checkRefreshToken, asyncHandler(refreshToken));

module.exports = router;