import express from "express";
import { getStar, getStars, addStar, removeStar } from '../controllers/star';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:starId', asyncHandler(getStar));
router.get('/', asyncHandler(getStars));
router.post('/add', asyncHandler(addStar)); // TODO: admin only
router.delete('/remove/:starId', asyncHandler(removeStar)); // TODO: admin only

module.exports = router;
