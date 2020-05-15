import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

import Figure from '../models/Figure';
import User from '../models/User';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateWith, possibleAssociateWith } from '../shared/enums';


const buildVideoFromRequest = (req: Request): IVideo => {
    return new Video({
        ...req.body,
        path: (req.file as any).location
    })
}

const associateVideoWithModel = async (associateWith: EnumAssociateWith, associateToId: string, newVideoId: string) => {
    let model: Model<Document> = Figure;
    switch (associateWith) {
        case EnumAssociateWith.figure:
            model = Figure;
            break;
        case EnumAssociateWith.video:
            model = Video;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $addToSet: { videos: newVideoId } }).exec();
};

export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = buildVideoFromRequest(req);
    await video.save();
    await associateVideoWithModel(video.associateWith, video.associatedId, video._id);

    res.status(201).json({
        message: 'Upload successfully completed',
        video: video // TODO:
    });
}

// deleteVideo


const disassociateVideoFromCollection = async (associateWith: EnumAssociateWith, associateToId: string, deletedVideoId: string) => {
    let model: Model<Document> = Figure;
    switch (associateWith) {
        case EnumAssociateWith.figure:
            model = Figure;
            break;
        case EnumAssociateWith.video:
            model = Video;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $pull: { videos: deletedVideoId } }).exec()
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
    console.log(video);
    await disassociateVideoFromCollection(video.associateWith, video.associatedId, video._id);

    res.status(200).json({
        message: 'Upload successfully deleted'
    });
}



