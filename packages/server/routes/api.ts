import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import asyncHandler from 'express-async-handler';
import { postLogin, postSignup, getReset, postReset, postForgot } from '../controllers/user';
import { getStars } from '../controllers/star';
import { getFigures } from '../controllers/figure';

const router = express.Router();
const account = require('./account');

// TODO: should be splitted to a few files (file for each of the controllers)

// login account
router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/reset/:token', getReset);
router.post('/reset/:token', postReset);
router.post('/forgot', postForgot);

router.use('/account', passport.authenticate('jwt', { session: false }), account);


router.get('/stars', asyncHandler(getStars));

router.get('/figures/:starId', asyncHandler(getFigures));

module.exports = router;
