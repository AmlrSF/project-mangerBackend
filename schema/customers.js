const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  profileImage: String,
  phoneNumber: String,
  bio: String,
  passwordHash: String,
  role: {
    type: Number,
    default: 0
  },
  registrationDate: { type: Date, default: Date.now() },
  country: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
