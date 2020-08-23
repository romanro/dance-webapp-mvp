import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import { IFigure } from './Figure';


const starSchema = new mongoose.Schema(
  {
    figures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Figure" }],
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      nickname: { type: String },
    },
    slug: { type: String, required: true, unique: true },
    location: {
      country: { type: String },
      city: { type: String }
    },
    birthDate: { type: Date },
    logo: {
      small: { type: String, required: true },
      large: { type: String, required: true },
    },
    promoVideo: { type: String, required: true },
    about: { type: String },
    achievements: [{ type: String }],
  },
  { timestamps: true }
);

interface IStarSchema extends Document {
  name: {
    firstName: String,
    lastName: String,
    nickname?: String,
  };
  slug: String;
  location?: {
    country?: String,
    city?: String
  };
  birthDate?: Date;
  logo: {
    small: String,
    large: String
  };
  promoVideo: String;
  about?: String;
  achievements?: String[];
}

interface IStarBase extends IStarSchema {
  // Virtuals and instance methods - should be here
}

export interface IStar extends IStarBase {
  figures: [IFigure["_id"]];
}

export interface IStarModel extends Model<IStar> {
}

export default model<IStar, IStarModel>('Star', starSchema);
