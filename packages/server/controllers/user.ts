import { Request, Response, NextFunction } from "express";
import { promisify } from "util";
import crypto from 'crypto';
import validator from 'validator';
import User, { IUser } from '../models/User';
import { sendVerifyEmail, sendForgotPasswordEmail, sendResetPasswordEmail } from '../services/email';
const randomBytesAsync = promisify(crypto.randomBytes);
import { HttpException } from "../shared/exceptions"


const NON_EXISTING_USER = {
  code: 'NON_EXISTING_USER',
  msg: 'User does not exist'
};

const INVALID_TOKEN = {
  code: 'INVALID_TOKEN',
  msg: 'Invalid token, please retry'
};

const INVALID_EMAIL = {
  code: 'INVALID_EMAIL',
  msg: 'Invalid email'
};

const PASSWORD_SHORT = {
  code: 'PASSWORD_SHORT',
  msg: 'Password must be at least 8 characters long'
};
const PASSWORD_MISMATCH = {
  code: 'PASSWORD_MISMATCH',
  msg: 'Passwords do not match'
};

const USER_EXISTS = {
  code: 'USER_EXISTS',
  msg: 'This user already exists'
}

/**
 * POST /login
 * Sign in using email and password.
 */

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push(INVALID_EMAIL);
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ code: 'BLANK_PASSWORD' });

  if (validationErrors.length > 0) {
    return res.json({
      success: false,
      errors: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  const user = await User.findByCredentials(req.body.email, req.body.password);
  const tokens = await user.generateAuthToken();

  return res.status(200).json({
    message: "Auth succeeded",
    tokens: tokens
  });
};


/**
 * POST /refreshToken
 * Refresh token.
 */

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokens = await req.user.generateAuthToken();

  return res.status(200).json({
    message: "Token refreshed successfully",
    tokens: tokens
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
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push(INVALID_EMAIL);
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push(PASSWORD_SHORT);
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push(PASSWORD_MISMATCH);

  if (validationErrors.length > 0) {
    return res.json({
      success: false,
      errors: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });


  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name,
      birthDate: {
        date: req.body.birthDate
      }
    }
  });

  await check_if_user_name_exists(req.body.email);
  await user.save();
  await verifyUserEmail(user);
  const tokens = await user.generateAuthToken()

  res.status(201).json({
    message: "User created",
    tokens: tokens
  });
};

/**
 * PATCH /account/profile
 * Update profile information.
 */
export const patchUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = [];
  // if (!req.body.email || !validator.isEmail(req.body.email))
  //   validationErrors.push({ msg: 'Please enter a valid email address.' });

  // if (validationErrors.length > 0) {
  //   req.flash('errors', validationErrors.join(", "));
  //   return res.redirect('/account');
  // }

  // req.body.email = validator.normalizeEmail(req.body.email, {
  //   gmail_remove_dots: false
  // });

  const updateOps: any = {}; // TODO: any

  // TODO: email cannot be changed (?)
  // if (user.email !== req.body.email) user.emailVerified = false;
  // user.email = req.body.email || '';
  updateOps.profile = {
    name: req.body.name || '',
    gender: req.body.gender || '',
    language: req.body.language || '',
    location: req.body.location || '',
    website: req.body.website || '',
    birthDate: { date: req.body.birthDate || '' } // TODO: '' or something else?
  };

  // TODO: runValidators doesnt work?
  User.findOneAndUpdate({ _id: req.user.id }, { $set: updateOps }, { runValidators: true })
    .exec()
    .then(user => {
      if (!user) {
        return res.json({
          success: false,
          errors: [
            {
              code: 'NON_EXISTING_USER',
              msg: 'User does not exist'
            }
          ]
        });
      }
      else {
        return res.json({
          success: true,
        });
      }
    })
    .catch(err => {
      next(err);
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
    user: userInfo
  });

};

/**
 * PATCH /account/password
 * Update current password.
 */
export const patchUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long'
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length > 0) {
    req.flash('errors', validationErrors.join(", "));
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        errors: [
          {
            code: 'NON_EXISTING_USER',
            msg: 'User does not exist'
          }
        ]
      });
    }
    user.password = req.body.password;
    user.save(err => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Password has been changed.');
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
  User.deleteOne({ _id: req.user.id }, err => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', 'Your account has been deleted.');
    res.redirect('/');
  });
};


/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = async (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isHexadecimal(req.params.token)) {
    return res.json({
      success: false,
      errors: [INVALID_TOKEN]
    });
  }

  try {
    const user = await User.findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires')
      .gt(Date.now())
      .exec();

    if (!user) {
      return res.json({
        success: false,
        errors: [NON_EXISTING_USER]
      });
    }
    return res.json({
      success: true
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /account/verify/:token
 * Verify email address with an existing token
 */
export const getVerifyEmailToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.emailVerified) {
    return res.json({
      success: false,
      errors: [
        {
          code: 'ALREADY_VERIFIED',
          msg: 'The email address was already verified'
        }
      ]
    });
  }

  if (req.params.token && !validator.isHexadecimal(req.params.token))
    return res.json({
      success: false,
      errors: [INVALID_TOKEN]
    });

  if (req.params.token !== req.user.emailVerificationToken) {
    return res.json({
      success: false,
      errors: [INVALID_TOKEN]
    });
  }

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.json({
        success: false,
        errors: [NON_EXISTING_USER]
      });
    }

    user.emailVerificationToken = '';
    user.emailVerified = true;
    await user.save();
    return res.json({
      success: true
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /account/verify
 * Verify email address
 */
export const getVerifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyUserEmail(req.user);
    return res.json({
      success: true
    });
  } catch (error) {
    switch (error) {
      case 'ALREADY_VERIFIED_EMAIL':
        return res.json({
          success: false,
          errors: [
            {
              code: 'ALREADY_VERIFIED_EMAIL',
              msg: 'Account email already verified'
            }
          ]
        });
      case 'INVALID_EMAIL':
        return res.json({
          success: false,
          errors: [INVALID_EMAIL]
        });
      default:
        return next(error);
    }
  }
};

const verifyUserEmail = async (user: IUser) => {
  if (user.emailVerified) {
    throw new Error('ALREADY_VERIFIED_EMAIL');
  }

  if (!validator.isEmail(user.email)) {
    throw new Error('INVALID_EMAIL');
  }

  const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));

  const dbUser = await User.findOne({ email: user.email });
  if (!dbUser) {
    throw new Error('UKNOWN_USER');
  }
  dbUser.emailVerificationToken = token;
  await dbUser.save();
  await sendVerifyEmail(user.email, token);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push(PASSWORD_SHORT);
  if (req.body.password !== req.body.confirm)
    validationErrors.push(PASSWORD_MISMATCH);
  if (!validator.isHexadecimal(req.params.token))
    validationErrors.push(INVALID_TOKEN);

  if (validationErrors.length > 0) {
    return res.json({
      success: false,
      errors: validationErrors
    });
  }
  try {
    const user = await User.findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires')
      .gt(Date.now())
      .exec();

    if (!user) {
      return res.json({
        success: false,
        errors: [INVALID_TOKEN]
      });
    }
    user.password = req.body.password;
    user.passwordResetToken = "";
    user.passwordResetExpires = 0;
    const dbUser = await user.save();
    await sendResetPasswordEmail(user.email);
    const tokens = await user.generateAuthToken();

    return res.json({
      success: true,
      tokens: tokens
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export const postForgot = async (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isEmail(req.body.email)) {
    return res.json({
      success: false,
      errors: [INVALID_EMAIL]
    });
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  try {
    const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        errors: [
          {
            code: 'NON_EXISTING_USER',
            msg: 'User does not exist'
          }
        ]
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
