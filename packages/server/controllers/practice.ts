import { NextFunction, Request, Response } from 'express';

import User from '../models/User';
import { getVideoById } from "./video"
import PracticeItem, { IPracticeItem } from '../models/PracticeItem';

/**
 * GET /
 * get all practice items
 */

export const getPracticeItems = async (req: Request, res: Response, next: NextFunction) => {
    await req.user.populate("practiceItems").execPopulate();
    res.status(200).json({
        success: true,
        data: req.user.practiceItems
    });
}

/**
 * GET /:practiceItemId
 * get practice item
 */

export const getPracticeItemById = async (practiceItemId: string): Promise<IPracticeItem> => (
    new Promise((resolve, reject) => {
        PracticeItem.findById(practiceItemId)
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new Error("Practice item not found"));
                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getPracticeItem = async (req: Request, res: Response, next: NextFunction) => {
    const practiceItem = await getPracticeItemById(req.params.practiceItemId);

    res.status(200).json({
        success: true,
        data: practiceItem
    });
}

/**
 * POST /
 * add practice item
 */

const buildpracticeItemFromRequest = async (req: Request): Promise<IPracticeItem> => {
    const video = await getVideoById(req.body.videoId);

    return new PracticeItem({
        associatedVideo: video._id
    })
}

export const addPracticeItem = async (req: Request, res: Response, next: NextFunction) => {
    const practiceItem = await buildpracticeItemFromRequest(req);
    
    await practiceItem.save();
    await User.updateOne({ _id: req.user._id }, { $addToSet: { practiceItems: practiceItem._id } }).exec();

    res.status(201).json({
        success: true,
        message: 'Practice item successfully added',
        data: practiceItem
    });
}


/**
 * DELETE /:practiceItemId
 * delete practice item
 */

const deletePracticeItemFromDb = (id: string): Promise<IPracticeItem> => (
    new Promise((resolve, reject) => {
        PracticeItem.findByIdAndRemove(id)
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new Error("Practice item not found"));
                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const deletePracticeItem = async (req: Request, res: Response, next: NextFunction) => {
    const practiceItem = await deletePracticeItemFromDb(req.params.practiceItemId);
    await User.updateOne({ _id: req.user._id }, { $pull: { practiceItems: practiceItem._id } }).exec();

    res.status(200).json({
        success: true,
        message: 'Practice item successfully deleted',
    });
}

