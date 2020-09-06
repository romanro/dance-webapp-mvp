import express from "express";
import asyncHandler from 'express-async-handler';
import { getVideo } from '../controllers/video';

const router = express.Router();

router.get('/:videoId', asyncHandler(getVideo));

module.exports = router;