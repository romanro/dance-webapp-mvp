import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import asyncHandler from 'express-async-handler';
import { postLogin, postSignup, getReset, postReset, postForgot } from '../controllers/user';

const router = express.Router();
const account = require('./account');
const stars = require('./stars');
const figures = require('./figures');

// TODO: should be splitted to a few files (file for each of the controllers)

// login account
router.post('/login', postLogin);
router.post('/signup', postSignup);
router.get('/reset/:token', getReset);
router.post('/reset/:token', postReset);
router.post('/forgot', postForgot);

router.use('/account', passport.authenticate('jwt', { session: false }), account);
router.use('/stars', passport.authenticate('jwt', { session: false }), stars);
router.use('/figures', passport.authenticate('jwt', { session: false }), figures);


module.exports = router;
