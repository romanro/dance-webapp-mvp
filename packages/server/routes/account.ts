import express, { Request, Response, NextFunction } from "express";
import {
    getVerifyEmail, getVerifyEmailToken, postUpdatePassword,
    postUpdateProfile, postDeleteAccount
} from '../controllers/user';
import { awsUpload } from "../services/awsUpload"

const router = express.Router();

// TODO: should be moved to a controller file
// TODO: error code: 200/201?
// TODO: fix (req.file as any) casting
router.post('/video/upload', awsUpload.single('video'), function (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ message: 'Upload successfully completed to: ' + (req.file as any).location });
  });

// JWT done
router.get('/verify', getVerifyEmail);
router.get('/verify/:token', getVerifyEmailToken);

// JWT not done
router.post('/password', postUpdatePassword);
router.post('/profile', postUpdateProfile);
router.post('/delete', postDeleteAccount);

module.exports = router;
