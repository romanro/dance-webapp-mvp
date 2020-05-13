import { Request, Response, NextFunction } from "express";
import Video, { IVideo } from '../models/Video';
import { EnumAssociateTo, possibleAssociateTo } from "../shared/enums"
import mongoose, { Document, Model } from 'mongoose';
import User from '../models/User';
import Figure from '../models/Figure';


const buildVideoFromRequest = (req: Request): IVideo => {
    return new Video({
        ...req.body,
        path: (req.file as any).location
    })
}

export const addVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = buildVideoFromRequest(req);
    await video.save();

    res.status(201).json({
        message: 'Upload successfully completed',
        video: video // TODO:
    });
}

const associateVideoWithModel = async (videoId: string, associateTo: EnumAssociateTo, associateToId: string) => {
    let model: Model<Document>;
    switch (associateTo) {
        case EnumAssociateTo.figure:
            model = Figure;
            break;
        case EnumAssociateTo.user:
            model = User;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $addToSet: { videos: videoId } }).exec()
};

export const associateVideo = async (req: Request, res: Response, next: NextFunction) => {
    await associateVideoWithModel(req.params.videoId, req.body.associateTo, req.body.associateToId);

    res.status(201).json({ message: 'Video successfully associated' });
}

const disassociateVideoFromCollection = async (videoId: string, associateTo: EnumAssociateTo, associateToId: string) => {
    let model: Model<Document>;
    switch (associateTo) {
        case EnumAssociateTo.figure:
            model = Figure;
            break;
        case EnumAssociateTo.user:
            model = User;
            break;
        // TODO: default:
    }
    return await model.updateOne({ _id: associateToId }, { $pull: { videos: videoId } }).exec()
};


export const disassociateVideo = async (req: Request, res: Response, next: NextFunction) => {
    const video = disassociateVideoFromCollection(req.params.videoId, req.body.associateTo, req.body.associateToId);

    res.status(201).json({ message: 'Video successfully disassociated' });
}
