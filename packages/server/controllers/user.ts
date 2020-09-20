import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { promisify } from 'util';

import User, { IUser } from '../models/User';
import { sendForgotPasswordEmail, sendResetPasswordEmail, sendVerifyEmail } from '../services/email';
import { Errors } from '../shared/erros';
import { HttpException } from '../shared/exceptions';

const randomBytesAsync = promisify(crypto.randomBytes);

const DEFAULT_BIRTH_DATE = '1990-12-31T00:00:00.000Z';

/**
 * POST /login
 * Sign in using email and password.
 */

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const tokens = await user.generateAuthToken();

  return res.status(200).json({
    success: true,
    message: "Auth succeeded",
    data: tokens
  });
};


/**
 * POST /refreshToken
 * Refresh token.
 */

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokens = await req.user.generateAuthToken();

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: tokens
  });
};


/**
 * POST /signup
 * Create a new local account.
 */

const check_if_user_name_exists = (email: string) => (
  new Promise(async (resolve, reject) => {
    const doesUserNameExists = await User.exists({ email: email });
    if (doesUserNameExists)
      reject(new HttpException(409, "User name already exists"));
    else
      resolve();
  })
);

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name,
      birthDate: {
        date: req.body.birthDate || DEFAULT_BIRTH_DATE
      }
    }
  });

  await check_if_user_name_exists(req.body.email);
  await user.save();
  await verifyUserEmail(user);
  const tokens = await user.generateAuthToken();

  res.status(201).json({
    success: true,
    message: "User created",
    data: tokens
  });
};

/**
 * PATCH /account/profile
 * Update profile information.
 */
export const patchUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  // TODO: email cannot be changed (?)
  // if (user.email !== req.body.email) user.emailVerified = false;
  // user.email = req.body.email || '';

  user.profile = {
    name: req.body.name || '',
    gender: req.body.gender || '',
    language: req.body.language || '',
    location: req.body.location || '',
    picture: req.body.picture || '',
    birthDate: { date: req.body.birthDate.date || DEFAULT_BIRTH_DATE }, // TODO: '' or something else?
    about: req.body.about || ''
  };

  await user.save();

  return res.json({
    success: true,
  });
}


/**
 * GET /account/profile
 * Get profile information.
 */

const getMyProfileInfo = async (id: string) => (
  await User.findById(id).select("email profile").exec()
);

export const getProfileInfo = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = await getMyProfileInfo(req.user.id);

  return res.json({
    success: true,
    data: userInfo
  });
};

/**
 * PATCH /account/password
 * Update current password.
 */
export const patchUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  user.password = req.body.password;

  await user.save();
  return res.json({
    success: true,
    message: "Password has been changed",
  });
};


/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    return res.json({
      success: false,
      errors: [{
        value: req.params.token,
        msg: Errors.NON_EXISTING_USER,
        param: "token",
        location: "params"
      }]
    });
  }
  return res.json({
    success: true
  });
};

/**
 * GET /account/verify/:token
 * Verify email address with an existing token
 */
export const getVerifyEmailToken = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user.emailVerified) {
    return res.json({
      success: false,
      errors: [{ msg: Errors.ALREADY_VERIFIED }]
    });
  }

  if (req.params.token !== user.emailVerificationToken) {
    return res.json({
      success: false,
      errors: [{ msg: Errors.TOKEN_MISMATCH }]
    })
  }

  user.emailVerificationToken = '';
  user.emailVerified = true;
  await user.save();

  return res.json({
    success: true
  });
};

/**
 * GET /account/verify
 * Verify email address
 */
export const getVerifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  await verifyUserEmail(req.user);
  return res.json({
    success: true
  });
};

const verifyUserEmail = async (user: IUser) => {
  if (user.emailVerified) {
    throw new HttpException(409, Errors.ALREADY_VERIFIED)
  }
  const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));

  user.emailVerificationToken = token;
  await user.save();
  await sendVerifyEmail(user.email, token);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    return res.json({
      success: false,
      errors: [{
        value: req.params.token,
        msg: Errors.NON_EXISTING_USER,
        param: "token",
        location: "params"
      }]
    });
  }
  user.password = req.body.password;
  user.passwordResetToken = "";
  user.passwordResetExpires = 0;

  await user.save();
  await sendResetPasswordEmail(user.email);
  const tokens = await user.generateAuthToken();

  return res.json({
    success: true,
    data: tokens
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export const postForgot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // TODO: security issue
      return res.json({
        success: true
      });
    }

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await sendForgotPasswordEmail(user, token);

    return res.json({
      success: true
    });
  } catch (error) {
    return next(error);
  }
};
