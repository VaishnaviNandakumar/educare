// user.model.js
const mongoose = require('mongoose');
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
  role: {
    type: String,
    required: true,
    index: true,
  },
});
// Export the model
module.exports = mongoose.model('User', userSchema);