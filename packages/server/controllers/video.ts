import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

import Figure from '../models/Figure';
import User from '../models/User';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateType, possibleAssociateTypes } from '../shared/enums';


/**
 * GET /:videoId
 * get video
 */

export const getVideoById = async (videoId: string): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findById(videoId)
            .exec()
            .then(video => {
                if (!video) {
                    reject(new Error("Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

const getPopulatedVideoById = async (videoId: string, associateType: EnumAssociateType): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        // TODO: should be changed to switch case?
        const populateTypeName = (associateType == EnumAssociateType.figure) ? "Figure" : "Video";
        Video.findById(videoId)
            .populate({
                path: 'associatedId',
                model: populateTypeName,
                // select: 'name age'
            })
            .exec()
            .then(video => {
                if (!video) {
                    reject(new Error("Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = await getVideoById(req.params.videoId);
    const associateType = video.associateWith;
    const poulatedVideo = await getPopulatedVideoById(video._id, associateType);

    res.status(200).json({
        video: poulatedVideo // TODO: Is all the information should be exposed to the user?
    });
}

/**
 * POST /upload
 * upload video
 */

const buildVideoFromRequest = (req: Request): IVideo => {
    return new Video({
        ...req.body,
        path: (req.file as any).location
    })
}

const associateVideoWithModel = async (associateWith: EnumAssociateType, associateToId: string, newVideoId: string) => {
    let model: Model<Document> = Figure;
    switch (associateWith) {
        case EnumAssociateType.figure:
            model = Figure;
            break;
        case EnumAssociateType.video:
            model = Video;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $addToSet: { videos: newVideoId } }).exec();
};

export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: validation for req.file
    const video = buildVideoFromRequest(req);
    await video.save();
    await associateVideoWithModel(video.associateWith, video.associatedId, video._id);

    res.status(201).json({
        message: 'Upload successfully completed',
        video: video // TODO:
    });
}


/**
 * DELETE /delete/:videoId
 * delete video
 */

const disassociateVideoFromCollection = async (associateWith: EnumAssociateType, associateToId: string, deletedVideoId: string) => {
    let model: Model<Document> = Figure;
    switch (associateWith) {
        case EnumAssociateType.figure:
            model = Figure;
            break;
        case EnumAssociateType.video:
            model = Video;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $pull: { videos: deletedVideoId } }).exec();
};

const deleteVideoFromDb = (id: string): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findByIdAndRemove(id)
            .exec()
            .then(video => {
                if (!video) {
                    reject(new Error("Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = await deleteVideoFromDb(req.params.videoId);
    await disassociateVideoFromCollection(video.associateWith, video.associatedId, video._id);

    res.status(200).json({
        message: 'Upload successfully deleted'
    });
}



