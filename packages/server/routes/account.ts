import express from "express";
import {
    getVerifyEmail, getVerifyEmailToken, patchUpdatePassword,
    patchUpdateProfile, getProfileInfo
} from '../controllers/user';
import { addPracticeItem, deletePracticeItem, getPracticeItems, getPracticeItem } from "../controllers/practice"
import asyncHandler from 'express-async-handler';
import { awsUserUpload } from "../services/aws";
import { rules_updatePassword, rules_verifyEmailToken } from "../middleware/rules/account";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/verify', asyncHandler(getVerifyEmail));
router.get('/verify/:token', rules_verifyEmailToken, validate, asyncHandler(getVerifyEmailToken));

router.get('/profile', asyncHandler(getProfileInfo));
router.patch('/profile', asyncHandler(patchUpdateProfile)); // TODO: validation is needed
router.patch('/password', rules_updatePassword, validate, asyncHandler(patchUpdatePassword));

// TODO: validation is needed:
router.get('/practices', asyncHandler(getPracticeItems));
router.get('/practices/:practiceItemId', asyncHandler(getPracticeItem));
router.post('/practices', awsUserUpload.single('video'), asyncHandler(addPracticeItem));
router.delete('/practices/:practiceItemId', asyncHandler(deletePracticeItem)); // middleware of check permissions is needed!


export default router;
