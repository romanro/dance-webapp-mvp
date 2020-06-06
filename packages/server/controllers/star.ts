import { Request, Response, NextFunction } from "express";
import Star, { IStar } from '../models/Star';

const getAllStars = async (): Promise<IStar[]> => (
    await Star.find().exec()
);

export const getStars = async (req: Request, res: Response, next: NextFunction) => {
    const stars = await getAllStars();
    console.log('stars:', stars)
    return res.json({
        stars: stars
    });
}

const getSpecificStar = async (id: string): Promise<IStar | null> => (
    await Star.findById(id).exec()
);

export const getStar = async (req: Request, res: Response, next: NextFunction) => {
    const star = await getSpecificStar(req.params.starId);
    return res.json({
        star: star
    });
}


const buildStarFromRequest = (req: Request): IStar => {
    return new Star({
        ...req.body
    })
}

export const addStar = async (req: Request, res: Response, next: NextFunction) => {
    const star = buildStarFromRequest(req);
    await star.save();

    res.status(201).json({
        message: "Created star successfully",
        star: star
    });
}

export const removeStar = async (req: Request, res: Response, next: NextFunction) => {
    await Star.deleteOne({ _id: req.params.starId })

    res.status(201).json({
        success: true,
    });
}