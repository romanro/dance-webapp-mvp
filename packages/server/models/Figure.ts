import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import { EnumDanceLevel, possibleDanceLevels, EnumDanceType, possibleDanceTypes } from "../shared/enums"
import { IStar } from './Star';


const figureSchema = new mongoose.Schema(
  {
    starIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Star' }],

    type: { type: EnumDanceType, enum: possibleDanceTypes, required: true },
    level: { type: EnumDanceLevel, enum: possibleDanceLevels, required: true },

    promoVideo: { type: String, required: true },
    basicPrinciplesVideos: [{ type: String, required: true }],
    mainVideos: [{ type: String, required: true }],
    additionalVideos: [{ type: String, required: true }],

    name: { type: String, required: true },
    coverURL: { type: String, required: true },
  },
  { timestamps: true }
);


interface IFigureSchema extends Document {
  type: EnumDanceType;
  level: EnumDanceLevel;
  promoVideo: string;
  basicPrinciplesVideos: Types.Array<string>;
  mainVideos: Types.Array<string>;
  additionalVideos: Types.Array<string>;
  name: string;
  coverURL: string;
}

interface IFigureBase extends IFigureSchema {
  // Virtuals and instance methods - should be here
}

export interface IFigure extends IFigureBase {
  starIds: [IStar["_id"]]; 
}

export interface IFigure_populated extends IFigureBase {
  starIds: [IStar]; 
}

export interface IFigureModel extends Model<IFigure> {
}

export default model<IFigure, IFigureModel>('Figure', figureSchema);