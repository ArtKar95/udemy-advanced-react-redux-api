import User from '../models/user.js';
import jwt from 'jwt-simple';

const createToken = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, process.env.SECRET_CODE);
};

export const signUp = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password are required' });
  }
  User.findOne({ email }, (err, isExist) => {
    if (err) {
      return next(err);
    }
    if (isExist) {
      return res.status(422).send({ email: 'Email is in use' });
    }
    const user = new User({ email, password });
    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({ token: createToken(user) });
    });
  });
};

export const signIn = (req, res, next) => {
  res.send({ token: createToken(req.user) });
};
