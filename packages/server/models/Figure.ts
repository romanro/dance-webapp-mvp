import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import { EnumDanceLevel, possibleDanceLevels, EnumDanceType, possibleDanceTypes } from "../shared/enums"
import { IStar } from './Star';
import { IVideo } from './Video';


const figureSchema = new mongoose.Schema(
  {
    stars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Star' }],
    type: { type: EnumDanceType, enum: possibleDanceTypes, required: true },
    level: { type: EnumDanceLevel, enum: possibleDanceLevels, required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],

    name: { type: String, required: true },
    coverURL: { type: String, required: true },
  },
  { timestamps: true }
);


interface IFigureSchema extends Document {
  type: EnumDanceType;
  level: EnumDanceLevel;
  promoVideo: string;
  name: string;
  coverURL: string;
}

interface IFigureBase extends IFigureSchema {
  // Virtuals and instance methods - should be here
}

export interface IFigure extends IFigureBase {
  stars: [IStar["_id"]];
  videos: [IVideo["_id"]];
}

export interface IFigure_populated extends IFigureBase {
  stars: [IStar]; 
  videos: [IVideo]; 
}

export interface IFigureModel extends Model<IFigure> {
}

export default model<IFigure, IFigureModel>('Figure', figureSchema);