import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "./User"


import { EnumAgeGroup, EnumGender, EnumLanguage, possibleGenders, possibleLanguages } from '../shared/enums';
import { jwtAccessPrivateKey, jwtRefreshPrivateKey, signOptionsAccessToken, signOptionsRefreshToken } from "../config/jwt"
import { IVideo } from './Video';

interface access_dto {
  refresh_token: String
  access_token: String
  expired_at: Date
}

interface BirthDate {
  date?: Date;
  group?: EnumAgeGroup;
}

interface Name {
  firstName: string;
  lastName: string;
  midName?: string;
  nickname?: string;
}

interface IProfile {
  gender?: EnumGender,
  language: EnumLanguage,
  birthDate: BirthDate,
  name: Name,
  about?: String,
  location?: String,
  website?: String,
  picture?: String,
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Number,
    emailVerificationToken: String,
    emailVerified: { type: Boolean, default: false },

    facebook: String,
    google: String,
    tokens: [{ type: String }],

    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],

    profile: {
      gender: { type: EnumGender, enum: possibleGenders }, // TODO: required: true?
      language: { type: EnumLanguage, enum: possibleLanguages, required: true, default: EnumLanguage.english },
      birthDate: {
        date: { type: Date },
      },
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        midName: { type: String },
        nickname: { type: String },
      },
      about: { type: String },
      location: { type: String },
      website: { type: String },
      picture: { type: String },
      // tags?: Tag[]; // TODO:
    }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  virtuals: true
});

const getAge = (birthday: Date) => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

userSchema.virtual('profile.birthDate.group').get(function (this: { profile: IProfile }) {
  let age, group;
  if (this.profile && this.profile.birthDate && this.profile.birthDate.date) {
    age = getAge(this.profile.birthDate.date);

    switch (true) {
      case (age < 12):
        group = EnumAgeGroup.CHILD;
        break;
      case (age < 18):
        group = EnumAgeGroup.YOUNG;
        break;
      default:
        group = EnumAgeGroup.ADULT;
        break;
    }
  }

  return group;
});



/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this as IUser;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
// TODO: any
userSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: any) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


interface IUserSchema extends Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: number;
  emailVerificationToken: string;
  emailVerified: boolean;

  facebook: String;
  google: String;
  tokens: Types.Array<string>;

  profile: IProfile;
}

interface IUserBase extends IUserSchema {
  comparePassword(candidatePassword: string, cb: any): any; // TODO: any
  generateAuthToken(): Promise<access_dto>;
}

userSchema.methods.generateAuthToken = async function (): Promise<access_dto> {
  const user = this;
  const accessToken = jwt.sign({ _id: user._id }, jwtAccessPrivateKey, signOptionsAccessToken);
  const refreshToken = jwt.sign({ _id: user._id }, jwtRefreshPrivateKey, signOptionsRefreshToken);

  return {
    "access_token": accessToken,
    "refresh_token": refreshToken,
    "expired_at": new Date(Date.now() + (60 * 60 * 1000 * 24 * 30)) // TODO: 30 days
  };
}

export interface IUser extends IUserBase {
  videos: [IVideo["_id"]];
}

export interface IUser_populated extends IUserBase {
  videos: [IVideo];
}


userSchema.statics.findByCredentials = async (email: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(user_name: string, password: string): Promise<IUser>;
}

export default model<IUser, IUserModel>('User', userSchema);