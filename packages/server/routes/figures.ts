import express from "express";
import { getFigures, addFigure, deleteFigure, getAllFigures } from '../controllers/figure';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:starId', asyncHandler(getFigures));
router.get('/all/:starId', asyncHandler(getAllFigures)); // TODO: admin only
router.post('/:starId', asyncHandler(addFigure));
router.delete('/:figureId', asyncHandler(deleteFigure));

module.exports = router;
