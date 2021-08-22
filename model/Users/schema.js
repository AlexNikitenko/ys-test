const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  surname: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
    match: [/(^[A-Za-z0-9]{1})[\w.-]{0,63}@(([A-Za-z0-9-]+\.)+[A-Za-z0-9]{2,})$/],
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });