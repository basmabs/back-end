const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = new Schema(
  {
    userName: { type: String, required: [true, `name is required`] },
    userDecription: { type: String, required: [true, `description is required`] },
    email: { type: String, required: [true, `email is required`] },
    password: { type: String, required: [true, `password is required`] },
    role: { type: String, required: [true, `role is required`]}, //default:' admin'
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports = mongoose.model('auth', Auth, 'auth');
