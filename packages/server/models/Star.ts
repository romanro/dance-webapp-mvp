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
    location: {
      country: { type: String, required: true },
      city: { type: String, required: true }
    },
    birthDate: { type: Date, required: true },
    userPics: {
      smallPicURL: { type: String, required: true },
      largePicURL: { type: String, required: true },
    },
    promoVideoURL: { type: String, required: true },
    about: { type: String, required: true },
  },
  { timestamps: true }
);

interface IStarSchema extends Document {
  name: {
    firstName: String,
    lastName: String,
    nickname?: String,
  };
  location: {
    country: String,
    city: String
  };
  birthDate: Date;
  userPics: {
    smallPicURL: String,
    largePicURL: String
  };
  promoVideoURL: String;
  about: String;
}

interface IStarBase extends IStarSchema {
  // Virtuals and instance methods - should be here
}

export interface IStar extends IStarBase {
  figures: [IFigure["_id"]];
}

export interface IStar_populated extends IStarBase {
  figures: [IFigure];
}

export interface IStarModel extends Model<IStar> {
}

export default model<IStar, IStarModel>('Star', starSchema);
