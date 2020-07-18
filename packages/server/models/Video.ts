import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import {
    EnumView, possibleViews, EnumParticipatesAmount, possibleParticipatesAmounts,
    EnumVideoType, possibleVideoTypes, EnumAssociateType, possibleAssociateTypes
} from "../shared/enums"
import { IFigure } from './Figure';


const videoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        path: { type: String, required: true },
        view: { type: EnumView, enum: possibleViews, required: true },
        participatesAmount: { type: EnumParticipatesAmount, enum: possibleParticipatesAmounts, required: true },
        associateWith: { type: EnumAssociateType, enum: possibleAssociateTypes, required: true },
        type: { type: EnumVideoType, enum: possibleVideoTypes, required: true },
        coverURL: { type: String, required: true },

        // ref should be indicated on populate (figure/video)
        associatedId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

interface IVideoSchema extends Document {
    name: string;
    path: string;
    view: EnumView;
    participatesAmount: EnumParticipatesAmount;
    associateWith: EnumAssociateType;
    type: EnumVideoType;
    coverURL: string;
}

interface IVideoBase extends IVideoSchema {
    // Virtuals and instance methods - should be here
}

export interface IVideo extends IVideoBase {
    associatedId: IVideo["_id"] | IFigure["_id"];
}

export interface IVideoModel extends Model<IVideo> {
}

export default model<IVideo, IVideoModel>('Video', videoSchema);
