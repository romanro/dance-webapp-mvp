import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import asyncHandler from 'express-async-handler';
import { postLogin, postSignup, getReset, postReset, postForgot } from '../controllers/user';
import { getStar, getStars, addStar, removeStar } from '../controllers/star';
import { getFigures, addFigure, deleteFigure, getAllFigures } from '../controllers/figure';

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

router.get('/stars/:starId', asyncHandler(getStar));
router.get('/stars', asyncHandler(getStars));
router.post('/stars/add', asyncHandler(addStar)); // TODO: admin only
router.delete('/stars/remove/:starId', asyncHandler(removeStar)); // TODO: admin only



router.get('/figures/', asyncHandler(getFigures));
router.post('/figures/:starId', asyncHandler(addFigure));
router.delete('/figures/:figureId', asyncHandler(deleteFigure));
router.get('/allFigures/:starId', asyncHandler(getAllFigures)); // TODO: admin only

module.exports = router;
