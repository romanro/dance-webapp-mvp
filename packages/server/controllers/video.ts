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

export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = await getVideoById(req.params.videoId);
    const associatedModel = video.associatedModel;
    const poulatedVideo = await getPopulatedVideoById(video._id, associatedModel);

    res.status(200).json({
        data: poulatedVideo // TODO: Is all the information should be exposed to the user?
    });
}

/**
 * POST /upload
 * upload video
 */

const buildVideoFromRequest = (req: Request, videoUrl: string, videoKey: string): IVideo => {
    return new Video({
        ...req.body,
        ownerUser: req.user._id,
        associatedModel: EnumAssociateModel.Video,
        ownerRole: EnumRole.user,
        key: videoUrl,
        path: videoKey,
        type: EnumVideoType.comparable
    })
}

export const associateVideoWithModel = async (associatedModel: EnumAssociateModel, associatedId: string, newVideoId: string) => {
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
    return await model.updateOne({ _id: associatedId }, { $addToSet: { videos: newVideoId } }).exec();
};

export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: validation for req.file

    // if (!req.body.thumbnail)
    //     generate thumbnail (mabye by s3 Lambda function
    // (https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html);

    const videoUrl = (req.file as any).location;
    const videoKey = (req.file as any).location;
    const video = buildVideoFromRequest(req, videoUrl, videoKey);

    await video.save();
    await associateVideoWithModel(EnumAssociateModel.Video, video.associatedObject, video._id);

    res.status(201).json({
        success: true,
        message: 'Upload video successfully completed',
        data: video // TODO:
    });
}


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

export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    // TODO:  check req.user permissions!

    const video = await deleteVideoFromDb(req.params.videoId);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);

    await awsDelete(video.key);

    res.status(200).json({
        success: true,
        message: 'Video successfully deleted'
    });
}
