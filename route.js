import { signUp, signIn } from './controllers/authentication.js';
import './services/passport.js';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const route = (app) => {
  app.use(passport.initialize());

  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, signIn);
  app.post('/signup', signUp);
};

export default route;
