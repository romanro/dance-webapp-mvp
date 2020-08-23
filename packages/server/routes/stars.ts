import express from "express";
import { getStar, getStars } from '../controllers/star';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:starId', asyncHandler(getStar));
router.get('/', asyncHandler(getStars));

module.exports = router;