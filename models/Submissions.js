// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  reqID: {
    type: String,
    required: true,
    index: true,
  },
  brand: {
    type: String,
    required: true,
    index: true,
  },
  model: {
    type: String,
    required: true,
    index: true,
  },
  info: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    index: true,
  },
});
// Export the model
module.exports = mongoose.model("Submissions", userSchema);