const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamps');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;
