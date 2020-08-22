import { Request, Response, NextFunction } from "express";
import Star, { IStar } from '../models/Star';
import Figure, { IFigure } from '../models/Figure';
import { EnumDanceLevel, possibleDanceLevels, EnumDanceType, possibleDanceTypes } from "../shared/enums"

const getFigureById = async (figureId: string): Promise<IFigure> => (
    new Promise((resolve, reject) => {
        Figure.findById(figureId)
            .populate("videos")
            .exec()
            .then(figure => {
                if (!figure) {
                    reject(new Error("Figure not found"));
                } else {
                    resolve(figure);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getFigure = async (req: Request, res: Response, next: NextFunction) => {
    const figure = await getFigureById(req.params.figureId);
    return res.json({
        figure: figure
    });
}

// TODO: find by name or by ID?

const getStarFiguresByTypeAndLevel = (starId: string, type: EnumDanceType, level: EnumDanceLevel): Promise<IFigure[]> => (
    new Promise((resolve, reject) => {
        Star.findById(starId)
            .populate("figures")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new Error("Star not found")); // TODO: http exception 404?
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

export const getFigures = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: check if req.params.starId is valid
    // TODO: req.query.danceType and req.query.level
    const typedLevelString = req.query.level as keyof typeof EnumDanceLevel;
    const typedTypeString = req.query.danceType as keyof typeof EnumDanceType;

    const figures = await getStarFiguresByTypeAndLevel(req.params.starId,
        EnumDanceType[typedTypeString], EnumDanceLevel[typedLevelString]);
    return res.json({
        figures: figures
    });
}

const getAllStarFigures = async (starId: string): Promise<IStar[]> => (
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


export const getAllFigures = async (req: Request, res: Response, next: NextFunction) => {
    const figures = await getAllStarFigures(req.params.starId);
    return res.json({
        success: true,
        figures: figures
    });
}