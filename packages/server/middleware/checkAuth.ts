import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { jwtAccessPublicKey, jwtRefreshPublicKey, verifyOptionsAccessToken, verifyOptionsRefreshToken } from '../config/jwt';
import User, { dataStoredInToken } from '../models/User';
import HttpException from '../shared/exceptions';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = "";
        if (req.headers.authorization && req.headers.authorization.split(" ")[1])
            token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtAccessPublicKey, verifyOptionsAccessToken) as dataStoredInToken;
        const user = await User.findById(decoded._id).exec();
        if (!user) {
            throw new HttpException(404, "User not found")
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Auth failed' });
    }
};

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params ? req.params.refresh_token : null;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Auth failed' });
        }

        const decoded = jwt.verify(token, jwtRefreshPublicKey, verifyOptionsRefreshToken) as dataStoredInToken;
        const user = await User.findById(decoded._id).exec();
        if (!user) {
            throw new Error("Auth failed: user not found")
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Auth failed' });
    }
};