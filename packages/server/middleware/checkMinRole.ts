import { Request, Response, NextFunction } from "express";
import { EnumRole } from "../shared/enums";

export const checkMinRole = (minRequireRole: EnumRole) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            if (user.role < minRequireRole) {
                res.status(401).send({ message: 'Invalid permissions' });
            }
            else {
                next();
            }
        }
        catch (err) {
            return res.status(401).json({ message: 'Auth failed' });
        }
    };
};