const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'pls provide a valid email'],
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },

  active: {
    type: Boolean,
    default: true,
  },
  createddAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
