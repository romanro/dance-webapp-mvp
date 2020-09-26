import { Request, Response } from 'express';

import Figure, { IFigure } from '../models/Figure';
import Star, { IStar } from '../models/Star';
import { EnumDanceLevel, EnumDanceType } from '../shared/enums';
import HttpException from '../shared/exceptions';

const getFigureById = async (figureId: string): Promise<IFigure> => (
    new Promise((resolve, reject) => {
        Figure.findById(figureId)
            .populate("videos")
            .exec()
            .then(figure => {
                if (!figure) {
                    reject(new HttpException(404, "Figure not found"));
                } else {
                    resolve(figure);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getFigure = async (req: Request, res: Response) => {
    const figure = await getFigureById(req.params.figureId);

    res.status(200).json({
        success: true,
        data: figure
    });
}

const getStarFiguresByTypeAndLevel = (starId: string, type: EnumDanceType, level: EnumDanceLevel): Promise<IFigure[]> => (
    new Promise((resolve, reject) => {
        Star.findById(starId)
            .populate("figures")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new HttpException(404, "Star not found"));
                } else {
                    const figures = star.figures as [IFigure];
                    resolve(figures.filter((figure) => (figure.type == type) && (figure.level == level)));
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const getFigures = async (req: Request, res: Response) => {
    // TODO: check if req.params.starId is valid
    // TODO: req.query.danceType and req.query.level
    const typedLevelString = req.query.level as keyof typeof EnumDanceLevel;
    const typedTypeString = req.query.danceType as keyof typeof EnumDanceType;

    const figures = await getStarFiguresByTypeAndLevel(req.params.starId,
        EnumDanceType[typedTypeString], EnumDanceLevel[typedLevelString]);

    res.status(200).json({
        success: true,
        data: figures
    });
}

const getAllStarFigures = async (starId: string): Promise<IStar[]> => (
    new Promise((resolve, reject) => {
        Star.findById(starId)
            .populate("figures")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new HttpException(404, "Star not found"));
                } else {
                    resolve(star.figures);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);


export const getAllFigures = async (req: Request, res: Response) => {
    const figures = await getAllStarFigures(req.params.starId);

    res.status(200).json({
        success: true,
        data: figures
    });
}