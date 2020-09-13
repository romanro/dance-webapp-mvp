import express, { Request, Response, NextFunction } from "express";
import {
    getVerifyEmail, getVerifyEmailToken, patchUpdatePassword,
    patchUpdateProfile, postDeleteAccount, getProfileInfo
} from '../controllers/user';
import { addPracticeItem, deletePracticeItem, getPracticeItems, getPracticeItem } from "../controllers/practice"
import asyncHandler from 'express-async-handler';
import { awsUserUpload } from "../services/aws";

const router = express.Router();

router.get('/verify', asyncHandler(getVerifyEmail));
router.get('/verify/:token', asyncHandler(getVerifyEmailToken));

router.get('/profile', asyncHandler(getProfileInfo));
router.patch('/profile', asyncHandler(patchUpdateProfile));
router.patch('/password', asyncHandler(patchUpdatePassword));
router.post('/delete', asyncHandler(postDeleteAccount));

router.get('/practices', asyncHandler(getPracticeItems));
router.get('/practices/:practiceItemId', asyncHandler(getPracticeItem));
router.post('/practices', awsUserUpload.single('video'), asyncHandler(addPracticeItem));
router.delete('/practices/:practiceItemId', asyncHandler(deletePracticeItem)); // middleware of check permissions is needed!


module.exports = router;
