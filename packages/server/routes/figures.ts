import express from "express";
import { getFigure, getFigures, getAllFigures } from '../controllers/figure';
import asyncHandler from 'express-async-handler';
import { rules_getAllStarFigures, rules_getFigureById, rules_getStarFigures } from "../middleware/rules/figures";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/star/:starId', rules_getStarFigures, validate, asyncHandler(getFigures));
router.get('/star/all/:starId', rules_getAllStarFigures, validate, asyncHandler(getAllFigures));
router.get('/:figureId', rules_getFigureById, validate, asyncHandler(getFigure));

export default router;