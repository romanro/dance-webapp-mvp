import { Request, Response } from "express";
import Star, { IStar } from '../models/Star';
import { HttpException } from "../shared/exceptions";

/**
 * GET /
 * get all stars
 */

const getAllStars = async (): Promise<IStar[]> => (
    await Star.find().exec()
);

export const getStars = async (req: Request, res: Response) => {
    const stars = await getAllStars();

    res.status(200).json({
        success: true,
        data: stars
    });
}

/**
 * GET /:starId
 * get star info
 */


const getStarInfo = async (id: string): Promise<IStar | null> => (
    new Promise((resolve, reject) => {
        Star.findById(id)
            .populate("figures", "type -_id")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new HttpException(404, "Star not found"));
                } else {
                    resolve(star);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getStar = async (req: Request, res: Response) => {
    const star = await getStarInfo(req.params.starId);

    res.status(200).json({
        success: true,
        data: star
    });
}