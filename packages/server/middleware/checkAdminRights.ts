import { Request, Response, NextFunction } from "express";
import { EnumRole } from "../shared/enums";

export const checkAdminRights = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role < EnumRole.admin) {
        return res.status(401).json({ success: false, message: 'Invalid permissions!' });
    }
    next();
};