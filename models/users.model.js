const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Method to generate a JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    created: this.created
  }, 'secretkey');
  return token;
};

module.exports = mongoose.model('User', userSchema);
