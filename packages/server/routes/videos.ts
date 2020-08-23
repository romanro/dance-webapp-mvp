import express from "express";
import asyncHandler from 'express-async-handler';
import { awsUserUpload } from "../services/aws"
import { getVideo, addVideo, deleteVideo } from '../controllers/video';

const router = express.Router();

router.get('/:videoId', asyncHandler(getVideo));
router.post('/', awsUserUpload.single('video'), asyncHandler(addVideo));
router.delete('/:videoId', asyncHandler(deleteVideo)); // middleware of check permissions is needed!

module.exports = router;