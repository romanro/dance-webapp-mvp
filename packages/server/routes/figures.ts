import express from "express";
import { getFigure, getFigures, getAllFigures } from '../controllers/figure';
import asyncHandler from 'express-async-handler';
import { rules_get_all_star_figures, rules_get_figure_by_id, rules_get_star_figures } from "../middleware/rules/figures";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/star/:starId', rules_get_star_figures, validate, asyncHandler(getFigures));
router.get('/star/all/:starId', rules_get_all_star_figures, validate, asyncHandler(getAllFigures));
router.get('/:figureId', rules_get_figure_by_id, validate, asyncHandler(getFigure));

module.exports = router;
