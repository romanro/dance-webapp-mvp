import express from "express";
import asyncHandler from 'express-async-handler';
import { awsUpload } from "../services/awsUpload"
import { addVideo, associateVideo, disassociateVideo } from '../controllers/video';

const router = express.Router();

router.post('/upload', awsUpload.single('video'), asyncHandler(addVideo));
router.post('/associate/:videoId', awsUpload.single('video'), asyncHandler(associateVideo));
router.post('/disassociate/:videoId', awsUpload.single('video'), asyncHandler(disassociateVideo));

module.exports = router;