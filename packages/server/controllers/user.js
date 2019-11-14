const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const mailChecker = require('mailchecker');
const User = require('../models/User');
const {
  sendVerifyEmail,
  sendForgotPasswordEmail,
  sendResetPasswordEmail
} = require('../services/email');
const { getToken } = require('../config/jwt');
const randomBytesAsync = promisify(crypto.randomBytes);

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
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push(INVALID_EMAIL);
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ code: 'BLANK_PASSWORD' });

  if (validationErrors.length) {
    return res.json({
      success: false,
      errors: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({
        success: false,
        errors: [
          {
            code: 'SIGN_PROVIDER_NO_CREDENTIALS',
            msg:
              'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.'
          }
        ]
      });
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.json({
        success: true,
        token: getToken(JSON.parse(JSON.stringify(user)))
      });
    });
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push(INVALID_EMAIL);
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push(PASSWORD_SHORT);
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push(PASSWORD_MISMATCH);

  if (validationErrors.length) {
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
    password: req.body.password
  });

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({
        success: false,
        errors: [
          {
            code: 'USER_EXISTS',
            msg: 'This user already exists'
          }
        ]
      });
    }
    await user.save();

    await new Promise((resolve, reject) => {
      req.logIn(user, async err => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      });
    });

    await verifyUserEmail(user);
    return res.json({
      success: true,
      token: getToken(user.toJSON())
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user.email !== req.body.email) user.emailVerified = false;
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save(err => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', {
            msg:
              'The email address you have entered is already associated with an account.'
          });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long'
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save(err => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, err => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const { provider } = req.params;
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter(
      token => token.kind !== provider.toLowerCase()
    );
    // Some auth providers do not provide an email address in the user profile.
    // As a result, we need to verify that unlinking the provider is safe by ensuring
    // that another login method exists.
    if (
      !(user.email && user.password) &&
      tokensWithoutProviderToUnlink.length === 0
    ) {
      req.flash('errors', {
        msg:
          `The ${_.startCase(
            _.toLower(provider)
          )} account cannot be unlinked without another form of login enabled.` +
          ' Please link another account or add an email address and password.'
      });
      return res.redirect('/account');
    }
    user.tokens = tokensWithoutProviderToUnlink;
    user.save(err => {
      if (err) {
        return next(err);
      }
      req.flash('info', {
        msg: `${_.startCase(_.toLower(provider))} account has been unlinked.`
      });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = async (req, res, next) => {
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
exports.getVerifyEmailToken = async (req, res, next) => {
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
exports.getVerifyEmail = async (req, res, next) => {
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

const verifyUserEmail = async user => {
  if (user.emailVerified) {
    throw new Error('ALREADY_VERIFIED_EMAIL');
  }

  if (!mailChecker.isValid(user.email)) {
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
exports.postReset = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push(PASSWORD_SHORT);
  if (req.body.password !== req.body.confirm)
    validationErrors.push(PASSWORD_MISMATCH);
  if (!validator.isHexadecimal(req.params.token))
    validationErrors.push(INVALID_TOKEN);

  if (validationErrors.length) {
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
      return res.json(INVALID_TOKEN);
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    const dbUser = await user.save();
    await sendResetPasswordEmail(user.email);

    return res.json({
      success: true,
      token: getToken(dbUser.toJSON())
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = async (req, res, next) => {
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
