const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  location: String,
  description: String,
  occupation: String
});

module.exports = mongoose.model('User', UserSchema);
