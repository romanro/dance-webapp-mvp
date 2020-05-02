import { Request, Response, NextFunction } from "express";
import Star, { IStar } from '../models/Star';
import Figure, { IFigure } from '../models/Figure';

// TODO: find by name or by ID?

const getAllFigures = (starId: string): Promise<IFigure[]> => (
    new Promise((resolve, reject) => {
        Star.findById(starId)
            .populate("figures")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new Error("Star not found")); // TODO: http exception 404?
                } else {
                    resolve(star.figures);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const getFigures = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: check if req.params.starId is valid
    // TODO: req.query.danceType and req.query.level
    const figures = await getAllFigures(req.params.starId);
    return res.json({
        success: true,
        figures: figures
    });
} 