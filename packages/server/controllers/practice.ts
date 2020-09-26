import { Request, Response } from 'express';

import User from '../models/User';
import { buildVideoFromRequest, associateVideoWithStarVideo, disassociateVideoFromCollection, deleteVideoFromDb } from "./video"
import PracticeItem, { IPracticeItem } from '../models/PracticeItem';
import { IVideo } from '../models/Video';
import { awsDelete } from '../services/aws';
import HttpException from '../shared/exceptions';

/**
 * GET /
 * get all practice items
 */

export const getPracticeItems = async (req: Request, res: Response) => {
    await req.user.populate({
        path: 'practiceItems',
        populate: {
            path: 'video',
            //select: '' // TODO: select is needed
        }
    }).execPopulate();

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
            //.select() // TODO: select is needed
            .populate("video")
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new HttpException(404, "Practice item not found"));

                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getPracticeItem = async (req: Request, res: Response) => {
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

const buildpracticeItemFromRequest = (req: Request, video: IVideo): IPracticeItem => {
    return new PracticeItem({
        video: video._id,
        name: req.body.name
    })
}

export const addPracticeItem = async (req: Request, res: Response) => {
    const videoUrl = (req.file as any).location;
    const videoKey = (req.file as any).key;
    const video = buildVideoFromRequest(req, videoUrl, videoKey);
    await video.save();
    await associateVideoWithStarVideo(video.associatedObject, video._id);

    const practiceItem = await buildpracticeItemFromRequest(req, video);
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
                    reject(new HttpException(404, "Practice item not found"));
                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const deletePracticeItem = async (req: Request, res: Response) => {
    const practiceItem = await getPracticeItemById(req.params.practiceItemId);

    const video = await deleteVideoFromDb(practiceItem.video._id);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);
    await awsDelete(video.key);

    await deletePracticeItemFromDb(req.params.practiceItemId);
    await User.updateOne({ _id: req.user._id }, { $pull: { practiceItems: practiceItem._id } }).exec();

    res.status(200).json({
        success: true,
        message: 'Practice item successfully deleted',
    });
}

