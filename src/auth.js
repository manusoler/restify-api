const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (res, rej) => {
    try {
      // Get user by email
      const user = await User.findOne({ email });
      // Match password
      if (bcrypt.compareSync(password, user.password)) {
        res(user);
      } else {
        // Pass didnt match
        rej('Authentication failed');
      }
    } catch (err) {
      // Email not found
      rej('Authentication failed');
    }
  });
};
