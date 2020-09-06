import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

import Figure from '../models/Figure';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateModel, EnumRole, EnumVideoType } from '../shared/enums';
import { awsDelete } from '../services/aws';

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

const getPopulatedVideoById = async (videoId: string, associatedModel: EnumAssociateModel): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findById(videoId)
            .populate({
                path: 'associatedObject',
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

// TODO: this request is needed?
export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = await getVideoById(req.params.videoId);
    const associatedModel = video.associatedModel;
    const poulatedVideo = await getPopulatedVideoById(video._id, associatedModel);

    res.status(200).json({
        success: true,
        data: poulatedVideo // TODO: Is all the information should be exposed to the user?
    });
}

/**
 * upload video
 */

export const buildVideoFromRequest = (req: Request, videoUrl: string, videoKey: string): IVideo => {
    return new Video({
        associatedObject: req.body.associatedVIdeoId,
        ownerUser: req.user._id,
        associatedModel: EnumAssociateModel.Video,
        ownerRole: EnumRole.user,
        key: videoUrl,
        path: videoKey,
        type: EnumVideoType.comparable
    })
}

export const associateVideoWithStarVideo = async (associatedVideoId: string, newVideoId: string) => {
    return await Video.updateOne({ _id: associatedVideoId }, { $addToSet: { videos: newVideoId } }).exec();
};


/**
 * DELETE /delete/:videoId
 * delete video
 */

export const disassociateVideoFromCollection = async (associatedModel: EnumAssociateModel, associatedId: string, deletedVideoId: string) => {
    let model: Model<Document> = Figure;
    switch (associatedModel) {
        case EnumAssociateModel.Figure:
            model = Figure;
            break;
        case EnumAssociateModel.Video:
            model = Video;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associatedId }, { $pull: { videos: deletedVideoId } }).exec();
};

export const deleteVideoFromDb = (id: string): Promise<IVideo> => (
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