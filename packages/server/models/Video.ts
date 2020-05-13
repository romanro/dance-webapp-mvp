import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import { EnumView, possibleViews, EnumParticipatesAmount, possibleParticipatesAmounts,
    EnumAssociateTo, possibleAssociateTo } from "../shared/enums"

const videoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        path: { type: String, required: true },
        isComparable: { type: Boolean, required: true },
        view: { type: EnumView, enum: possibleViews, required: true },
        participatesAmount: { type: EnumParticipatesAmount, enum: possibleParticipatesAmounts, required: true },
    },
    { timestamps: true }
);

interface IVideoSchema extends Document {
    name: string;
    path: string;
    isComparable: Boolean;
    view: EnumView;
    participatesAmount: EnumParticipatesAmount;
}

interface IVideoBase extends IVideoSchema {
    // Virtuals and instance methods - should be here
}

export interface IVideo extends IVideoBase {
}

export interface IVideo_populated extends IVideoBase {
}

export interface IVideoModel extends Model<IVideo> {
}

export default model<IVideo, IVideoModel>('Video', videoSchema);
