import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, Model, model, Types } from 'mongoose';


const profileSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true },
  picture: { type: String, required: true },
});

interface IProfile {
  name: string;
  gender: string;
  location: string;
  website: string;
  picture: string;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Number,
    emailVerificationToken: String,
    emailVerified: Boolean,

    facebook: String,
    google: String,
    tokens: [{ type: String }],

    profile: profileSchema,
  },
  { timestamps: true }
);

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
}

export interface IUser extends IUserBase {
}

export interface IUser_populated extends IUserBase {
}

export interface IUserModel extends Model<IUser> {
}

export default model<IUser, IUserModel>('User', userSchema);