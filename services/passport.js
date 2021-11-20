import passport from 'passport';
import User from '../models/user.js';
import { ExtractJwt, Strategy } from 'passport-jwt';
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'keniwe518egweinuge5f1wegeuwbif',
};

const jwtLogin = new Strategy(jwtOption, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
passport.use(localLogin);
passport.use(jwtLogin);
