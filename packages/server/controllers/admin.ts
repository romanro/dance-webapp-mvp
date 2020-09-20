import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

import Figure, { IFigure } from '../models/Figure';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateModel, EnumRole } from '../shared/enums';
import { awsDelete, awsListObjects } from '../services/aws';
import { deleteVideoFromDb, disassociateVideoFromCollection } from './video'
import Star, { IStar } from '../models/Star';


/**
 * POST /admins/stars/add
 * add star
 */

const buildStarFromRequest = (req: Request): IStar => {
    return new Star({
        ...req.body
    })
}

export const addStar = async (req: Request, res: Response, next: NextFunction) => {
    const star = buildStarFromRequest(req);
    await star.save();

    res.status(201).json({
        success: true,
        message: "Created star successfully",
        data: star
    });
}

/**
 * DELETE /admins/stars/:starId
 * remove star
 */

export const removeStar = async (req: Request, res: Response, next: NextFunction) => {
    await Star.deleteOne({ _id: req.params.starId })

    res.status(201).json({
        success: true,
    });
}

/**
 * POST /admins/videos/:starId
 * add video
 */

const buildVideoFromRequest = (req: Request, videoUrl: string, videoKey: string): IVideo => {
    return new Video({
        ...req.body,
        ownerUser: req.user._id,
        ownerRole: EnumRole.admin,
        associatedModel: EnumAssociateModel.Figure,
        key: videoUrl,
        path: videoKey
    })
}

export const associateVideoWithFigure = async (associatedId: string, newVideoId: string) => {
    return await Figure.updateOne({ _id: associatedId }, { $addToSet: { videos: newVideoId } }).exec();
};

export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: validation for req.file

    const videoUrl = req.file ? (req.file as any).location : req.body.videoUrl;
    const videoKey = req.file ? (req.file as any).key : req.body.videoKey;
    const video = buildVideoFromRequest(req, videoUrl, videoKey);

    await video.save();
    await associateVideoWithFigure(video.associatedObject, video._id);

    // TODO: select params for video

    res.status(201).json({
        success: true,
        message: 'Upload video successfully completed',
        data: video // TODO:
    });
}

/**
 * DELETE /admins/videos/:starId
 * delete video
 */

export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = await deleteVideoFromDb(req.params.videoId);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);

    await awsDelete(video.key);

    res.status(200).json({
        success: true,
        message: 'Video successfully deleted'
    });
}


/**
 * GET /admins/s3objects/
 * list s3 objects
 */

export const listS3Object = async (req: Request, res: Response, next: NextFunction) => {
    const objects = await awsListObjects();

    res.status(200).json({
        data: objects
    });
}

/**
 * POST /admins/s3objects/:path
 * add s3 object
 */


export const addS3Object = async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        success: true,
        message: 'Upload successfully completed',
        data: (req.file as any).location
    });
}

/**
 * DELETE /admins/s3objects/:path
 * delete s3 object
 */

export const deleteS3Object = async (req: Request, res: Response, next: NextFunction) => {
    const result = await awsDelete(req.body.key);
    console.log(result);

    res.status(200).json({
        success: true,
        message: 'Object successfully deleted'
    });
}

/**
 * POST /admins/figures/:path
 * add figure
 */

const buildFigureFromRequest = (req: Request): IFigure => {
    return new Figure({
        ...req.body
    })
}

const addfigureToStar = async (figure: IFigure, starIds: [string]) => (
    new Promise(async (resolve, reject) => {
        for (const starId of starIds) {
            await Star.updateOne({ _id: starId }, { $addToSet: { figures: figure } }).exec()
        }
        resolve();
    })
);

export const addFigure = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: validation for starIds is needed

    const figureToAdd = buildFigureFromRequest(req);
    const figure = await figureToAdd.save();
    await addfigureToStar(figureToAdd, req.body.stars);

    res.status(201).json({
        success: true,
        message: "Figure added successfully to the star",
        data: figure
    });
}


/**
 * DELETE /admins/figures/:path
 * delete figure
 */

const removeFigureFromFiguresCollection = (figureId: string): Promise<IFigure> => (
    new Promise((resolve, reject) => {
        Figure.findOneAndDelete({ _id: figureId })
            .exec()
            .then(deletedFigure => {
                if (!deletedFigure) {
                    reject(new Error("Figure not found"));
                } else {
                    resolve(deletedFigure);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

const removeFigureFromStar = (figure: IFigure) => (
    new Promise((resolve, reject) => {
        for (const starId of figure.stars) {
            Star.updateOne({ _id: starId }, { $pull: { figures: figure._id } }).exec()
        }
        resolve();
    })
);

export const deleteFigure = async (req: Request, res: Response, next: NextFunction) => {
    const deletedFigure = await removeFigureFromFiguresCollection(req.params.figureId);
    await removeFigureFromStar(deletedFigure);

    res.status(200).json({
        success: true,
        message: "Figure removed"
    });
}