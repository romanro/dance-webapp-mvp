import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, VerifyOptions } from 'jsonwebtoken';

import { jwtAccessPublicKey, jwtRefreshPublicKey, verifyOptionsAccessToken, verifyOptionsRefreshToken } from '../config/jwt';
import User, { dataStoredInToken } from '../models/User';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || authHeader.split(" ").length == 0) {
        return res.status(401).json({ success: false, message: 'Not authenticated!' });
    }

    const token = authHeader.split(" ")[1];
    await dataStoredInTokenToUser(req, res, next, jwtAccessPublicKey, verifyOptionsAccessToken, token);
};

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    return await dataStoredInTokenToUser(req, res, next, jwtRefreshPublicKey, verifyOptionsRefreshToken,
        req.params.refresh_token);
};

const dataStoredInTokenToUser = async (req: Request, res: Response, next: NextFunction,
    jwtPublicKey: Secret, jwtVerifyOptions: VerifyOptions, token?: string) => {
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated!' });
        }

        const decoded = jwt.verify(token, jwtPublicKey, jwtVerifyOptions) as dataStoredInToken;
        const user = await User.findById(decoded._id).select("+email").exec();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // eslint-disable-next-line require-atomic-updates
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authenticated!' });
    }
}