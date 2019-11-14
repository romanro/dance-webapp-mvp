const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const mailChecker = require('mailchecker');
const User = require('../models/User');
const { sendVerifyEmail } = require('../services/email');
const { getToken } = require('../config/jwt');
const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ code: 'INVALID_EMAIL' });
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
  if (!validator.isEmail(req.body.email))
    validationErrors.push({
      msg: 'Please enter a valid email address.',
      code: 'EMAIL_INVALID'
    });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      code: 'PASSWORD_SHORT',
      msg: 'Password must be at least 8 characters long'
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({
      code: 'PASSWORD_MISMATCH',
      msg: 'Passwords do not match'
    });

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
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  const validationErrors = [];
  if (!validator.isHexadecimal(req.params.token))
    validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/forgot');
  }

  User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', {
          msg: 'Password reset token is invalid or has expired.'
        });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset'
      });
    });
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
      errors: [
        {
          code: 'INVALID_TOKEN',
          msg: 'Invalid token, please retry'
        }
      ]
    });

  if (req.params.token !== req.user.emailVerificationToken) {
    return res.json({
      success: false,
      errors: [
        {
          code: 'INVALID_TOKEN',
          msg: 'Invalid token, please retry'
        }
      ]
    });
  }

  try {
    const user = await User.findOne({ email: req.user.email });
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
          errors: [
            {
              code: 'INVALID_EMAIL',
              msg:
                'The email address is invalid or disposable and can not be verified.  Please update your email address and try again.'
            }
          ]
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
exports.postReset = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long'
    });
  if (req.body.password !== req.body.confirm)
    validationErrors.push({ msg: 'Passwords do not match' });
  if (!validator.isHexadecimal(req.params.token))
    validationErrors.push({ msg: 'Invalid Token.  Please retry.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('back');
  }

  const resetPassword = () =>
    User.findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires')
      .gt(Date.now())
      .then(user => {
        if (!user) {
          req.flash('errors', {
            msg: 'Password reset token is invalid or has expired.'
          });
          return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(
          () =>
            new Promise((resolve, reject) => {
              req.logIn(user, err => {
                if (err) {
                  return reject(err);
                }
                resolve(user);
              });
            })
        );
      });

  const sendResetPasswordEmail = user => {
    if (!user) {
      return;
    }
    let transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Your Hackathon Starter password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        req.flash('success', {
          msg: 'Success! Your password has been changed.'
        });
      })
      .catch(err => {
        if (err.message === 'self signed certificate in certificate chain') {
          console.log(
            'WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.'
          );
          transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          return transporter.sendMail(mailOptions).then(() => {
            req.flash('success', {
              msg: 'Success! Your password has been changed.'
            });
          });
        }
        console.log(
          'ERROR: Could not send password reset confirmation email after security downgrade.\n',
          err
        );
        req.flash('warning', {
          msg:
            'Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.'
        });
        return err;
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => {
      if (!res.finished) res.redirect('/');
    })
    .catch(err => next(err));
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/forgot');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  const createRandomToken = randomBytesAsync(16).then(buf =>
    buf.toString('hex')
  );

  const setRandomToken = token =>
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        req.flash('errors', {
          msg: 'Account with that email address does not exist.'
        });
      } else {
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user = user.save();
      }
      return user;
    });

  const sendForgotPasswordEmail = user => {
    if (!user) {
      return;
    }
    const token = user.passwordResetToken;
    let transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'hackathon@starter.com',
      subject: 'Reset your password on Hackathon Starter',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        req.flash('info', {
          msg: `An e-mail has been sent to ${user.email} with further instructions.`
        });
      })
      .catch(err => {
        if (err.message === 'self signed certificate in certificate chain') {
          console.log(
            'WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.'
          );
          transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          return transporter.sendMail(mailOptions).then(() => {
            req.flash('info', {
              msg: `An e-mail has been sent to ${user.email} with further instructions.`
            });
          });
        }
        console.log(
          'ERROR: Could not send forgot password email after security downgrade.\n',
          err
        );
        req.flash('errors', {
          msg:
            'Error sending the password reset message. Please try again shortly.'
        });
        return err;
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .then(() => res.redirect('/forgot'))
    .catch(next);
};
