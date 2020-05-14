import express, { Request, Response, NextFunction } from "express";
import {
    getVerifyEmail, getVerifyEmailToken, patchUpdatePassword,
    patchUpdateProfile, postDeleteAccount, getProfileInfo
} from '../controllers/user';

const router = express.Router();

router.get('/verify', getVerifyEmail);
router.get('/verify/:token', getVerifyEmailToken);

router.get('/profile', getProfileInfo);
router.patch('/profile', patchUpdateProfile);
router.patch('/password', patchUpdatePassword);
router.post('/delete', postDeleteAccount);

module.exports = router;
