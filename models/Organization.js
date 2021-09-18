// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  location: {
    type: String,
    required: true,
    unique: false,
    index: true,
  },
  funding: {
    type: Number,
    required: true,
    unique: false,
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    default: 'PENDING',
    index: true,
  },
  representative: {
    type: String,
    default: '',
    index: true,
  },
  contact1: {
    type: String,
    default: '',
    index: true,
  },
  contact2: {
    type: String,
    default: '',
    index: true,
  },
  file1: {
    contentType: String,
    default: ""
  },
});
// Export the model
module.exports = mongoose.model("Organization", userSchema);
