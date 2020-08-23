import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import {
    EnumView, possibleViews, EnumParticipatesAmount, possibleParticipatesAmounts,
    EnumAssociateModel, possibleAssociateModels, EnumRole, possibleRoles, EnumVideoType, possibleVideoTypes
} from "../shared/enums"
import { IFigure } from './Figure';
import { IUser } from './User';


const videoSchema = new mongoose.Schema(
    {
        ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        ownerRole: { type: EnumRole, enum: possibleRoles },

        associatedObject: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'associatedModel' },
        associatedModel: { type: EnumAssociateModel, enum: possibleAssociateModels, required: true },
        thumbnail: { type: String },

        key: { type: String, required: true },
        type: { type: EnumVideoType, enum: possibleVideoTypes, required: true },
        name: { type: String, required: true },
        view: { type: EnumView, enum: possibleViews },
        participatesAmount: { type: EnumParticipatesAmount, enum: possibleParticipatesAmounts },
    },
    { timestamps: true }
);

interface IVideoSchema extends Document {
    ownerRole: EnumRole;
    key: string;
    name: string;
    view?: EnumView;
    participatesAmount?: EnumParticipatesAmount;
    associatedModel: EnumAssociateModel;
    thumbnail: string;
}

interface IVideoBase extends IVideoSchema {
    // Virtuals and instance methods - should be here
}

export interface IVideo extends IVideoBase {
    ownerUser: IUser["_id"];
    associatedObject: IVideo["_id"] | IFigure["_id"];
}

export interface IVideoModel extends Model<IVideo> {
}

export default model<IVideo, IVideoModel>('Video', videoSchema);
