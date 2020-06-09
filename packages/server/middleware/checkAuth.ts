import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
import User from "../models/User";
import { jwtAccessPublicKey, jwtRefreshPublicKey, verifyOptionsAccessToken, verifyOptionsRefreshToken } from "../config/jwt"

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = "";
        if (req.headers.authorization && req.headers.authorization.split(" ")[1])
            token = req.headers.authorization.split(" ")[1];
        const decoded: any = jwt.verify(token, jwtAccessPublicKey, verifyOptionsAccessToken);

        const user = await User.findById(decoded._id).exec();
        if (!user) {
            throw new Error("Auth failed: user not found")
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params ? req.params.refresh_token : null;
        if (!token)
        {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const decoded: any = jwt.verify(token, jwtRefreshPublicKey, verifyOptionsRefreshToken);

        const user = await User.findById(decoded._id).exec();
        if (!user) {
            throw new Error("Auth failed: user not found")
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};