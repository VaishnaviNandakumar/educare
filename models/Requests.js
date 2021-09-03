// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  desc: {
    type: String,
    required: true,
    index: true,
  },
});
// Export the model
module.exports = mongoose.model("Requests", userSchema);
