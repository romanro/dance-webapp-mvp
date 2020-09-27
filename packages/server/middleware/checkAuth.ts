import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtAccessPublicKey, jwtRefreshPublicKey, verifyOptionsAccessToken, verifyOptionsRefreshToken } from '../config/jwt';
import User, { dataStoredInToken } from '../models/User';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = "";
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Not authenticated!' });
        }
        token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, jwtAccessPublicKey, verifyOptionsAccessToken) as dataStoredInToken;
        const user = await User.findById(decoded._id).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // eslint-disable-next-line require-atomic-updates
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authenticated!' });
    }
};

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params ? req.params.refresh_token : null;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated!' });
        }

        const decoded = jwt.verify(token, jwtRefreshPublicKey, verifyOptionsRefreshToken) as dataStoredInToken;
        const user = await User.findById(decoded._id).exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // eslint-disable-next-line require-atomic-updates
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authenticated!' });
    }
};