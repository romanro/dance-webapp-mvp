import express, { Request, Response, NextFunction } from "express";
import {
    getVerifyEmail, getVerifyEmailToken, patchUpdatePassword,
    patchUpdateProfile, postDeleteAccount, getProfileInfo
} from '../controllers/user';
import { awsUpload } from "../services/awsUpload"

const router = express.Router();

// TODO: should be moved to a controller file
// TODO: fix any casting
router.post('/video/upload', awsUpload.single('video'), function (req: Request, res: Response, next: NextFunction) {
    res.status(201).json({ message: 'Upload successfully completed to: ' + (req.file as any).location });
  });

router.get('/verify', getVerifyEmail);
router.get('/verify/:token', getVerifyEmailToken);

router.get('/profile', getProfileInfo);
router.patch('/profile', patchUpdateProfile);
router.patch('/password', patchUpdatePassword);
router.post('/delete', postDeleteAccount);

module.exports = router;
