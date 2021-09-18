// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  org: {
    type: String,
    required: true,
    index: true,
  },
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
  image: {
    data: Buffer,
    contentType: String,
  },
});
// Export the model
module.exports = mongoose.model("Submissions", userSchema);
