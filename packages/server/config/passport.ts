import passport from 'passport';
const { Strategy: LocalStrategy } = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

import { jwtConfig, JWT_SECRET } from  './jwt';
import User, { IUser } from "../models/User";

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  // TODO: any
  new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, {
          msg:
            'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.'
        });
      }
      // TODO: any
      user.comparePassword(password, (err: any, isMatch: string) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  })
);

const jwtStrategyInstance = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    ...jwtConfig
  },
  // TODO: any
  function handleJWTAuth(payload: any, done: any) {
    User.findOne({ email: payload.email }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user); // TODO: should be checked... user.profile mabye? toJson?
      } else {
        return done(null, false);
      }
    });
  }
);

passport.use('jwt', jwtStrategyInstance);
