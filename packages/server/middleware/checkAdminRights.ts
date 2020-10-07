import { Request, Response, NextFunction } from "express";
import { EnumRole } from "../shared/enums";

export const checkAdminRights = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role < EnumRole.admin) {
        // TODO: security issue? returns 404 instead of this?
        return res.status(401).json({ success: false, message: 'Invalid permissions!' });
    }
    next();
};