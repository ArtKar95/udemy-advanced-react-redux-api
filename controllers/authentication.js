import User from "../models/user.js";

const signUp = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Email and password are required" });
  }
  User.findOne({ email }, (err, isExist) => {
    if (err) {
      return next(err);
    }
    if (isExist) {
      return res.status(422).send({ email: "Email is in use" });
    }
    const user = new User({ email, password });
    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  });
};

export default signUp;
