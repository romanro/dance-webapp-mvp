import express from "express";
import asyncHandler from 'express-async-handler';
import { awsUpload } from "../services/awsUpload"
import { addVideo, deleteVideo } from '../controllers/video';

const router = express.Router();

router.post('/upload', awsUpload.single('video'), asyncHandler(addVideo));
router.delete('/delete/:videoId', asyncHandler(deleteVideo));

module.exports = router;