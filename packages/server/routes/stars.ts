import express from "express";
import { getStar, getStars } from '../controllers/star';
import asyncHandler from 'express-async-handler';
import { validate } from "../middleware/validation";
import { rules_get_star_by_id } from "../middleware/rules/stars";

const router = express.Router();

router.get('/:starId', rules_get_star_by_id, validate, asyncHandler(getStar));
router.get('/', asyncHandler(getStars));

module.exports = router;