const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
  // Register user
  server.post('/users', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError());
    }
    const { email, password } = req.body;
    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash pass
        user.password = hash;
        // Save user to mongodb
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (error) {
          return next(new errors.InternalError(error));
        }
      });
    });
  });

  // auth user
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // authenticate user
      const user = await auth.authenticate(email, password);
      // Create a json web token
      console.log(user);
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });
      const { iat, exp } = jwt.decode(token);
      res.send({ iat, exp, token });
      next();
    } catch (err) {
      return next(new errors.UnauthorizedError(err));
    }
  });
};
