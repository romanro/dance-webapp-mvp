import { Request, Response, NextFunction } from "express";
import Star, { IStar } from '../models/Star';

const getAllStars = async (): Promise<IStar[]> => (
    await Star.find().exec()
);

export const getStars = async (req: Request, res: Response, next: NextFunction) => {
    const stars = await getAllStars();
    return res.json({
        success: true,
        stars: stars
    });
}