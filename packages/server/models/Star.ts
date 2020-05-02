import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import { IFigure } from './Figure';


const starSchema = new mongoose.Schema(
  {
    figures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Figure' }],
    name: {
      firstName: String,
      lastName: String,
      nickname: String,
    },
    location: {
      country: String,
      city: String
    },
    birthDate: Date,
    userPics: {
      smallPicURL: String,
      largePicURL: String
    },
    promoVideoURL: String,
    about: String,
  },
  { timestamps: true }
);

interface IStarSchema extends Document {
  name: {
    firstName: String,
    lastName: String,
    nickname: String,
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
