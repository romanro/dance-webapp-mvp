import express from "express";
import { getFigure, getFigures, getAllFigures } from '../controllers/figure';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/star/:starId', asyncHandler(getFigures));
router.get('/star/all/:starId', asyncHandler(getAllFigures)); // TODO: admin only?
router.get('/:figureId', asyncHandler(getFigure));

module.exports = router;
