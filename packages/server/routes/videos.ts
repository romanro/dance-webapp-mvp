import express from "express";
import asyncHandler from 'express-async-handler';
import { getVideo } from '../controllers/video';
import { rules_getVideoById } from "../middleware/rules/videos";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/:videoId', rules_getVideoById, validate, asyncHandler(getVideo));

export default router;
