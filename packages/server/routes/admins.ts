import express from "express";
import asyncHandler from 'express-async-handler';
import { awsAdminUpload } from "../services/aws"
import { listS3Object, addS3Object, deleteS3Object,addStar, removeStar, addVideo,
    deleteVideo, 
    addFigure,
    deleteFigure} from "../controllers/admin";

const router = express.Router();

 // TODO: validation is needed:

// S3 videos
router.post('/videos', awsAdminUpload.single('video'), asyncHandler(addVideo));
router.delete('/videos/:videoId', asyncHandler(deleteVideo));

// S3 objects 
router.get('/S3objects', asyncHandler(listS3Object));
router.post('/S3objects', awsAdminUpload.single('object'), asyncHandler(addS3Object));
router.delete('/S3objects', asyncHandler(deleteS3Object));

// stars
router.post('/stars', asyncHandler(addStar));
router.delete('/stars/:starId', asyncHandler(removeStar));

// figures
router.post('/figures', asyncHandler(addFigure));
router.delete('/figures/:figureId', asyncHandler(deleteFigure));

module.exports = router;