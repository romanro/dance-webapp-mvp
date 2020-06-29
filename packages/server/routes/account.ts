import express, { Request, Response, NextFunction } from "express";
import {
    getVerifyEmail, getVerifyEmailToken, patchUpdatePassword,
    patchUpdateProfile, postDeleteAccount, getProfileInfo
} from '../controllers/user';
import { addPracticeItem, deletePracticeItem, getPracticeItems, getPracticeItem } from "../controllers/practice"
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/verify', asyncHandler(getVerifyEmail));
router.get('/verify/:token', asyncHandler(getVerifyEmailToken));

router.get('/profile', asyncHandler(getProfileInfo));
router.patch('/profile', asyncHandler(patchUpdateProfile));
router.patch('/password', asyncHandler(patchUpdatePassword));
router.post('/delete', asyncHandler(postDeleteAccount));

router.get('/practices', asyncHandler(getPracticeItems));
router.get('/practices/:practiceItemId', asyncHandler(getPracticeItem));
router.post('/practices', asyncHandler(addPracticeItem));
router.delete('/practices/:practiceItemId', asyncHandler(deletePracticeItem));


module.exports = router;
