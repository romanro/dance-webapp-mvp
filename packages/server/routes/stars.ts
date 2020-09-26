import express from "express";
import { getStar, getStars } from '../controllers/star';
import asyncHandler from 'express-async-handler';
import { validate } from "../middleware/validation";
import { rules_getStarById } from "../middleware/rules/stars";

const router = express.Router();

router.get('/:starId', rules_getStarById, validate, asyncHandler(getStar));
router.get('/', asyncHandler(getStars));

export default router;
