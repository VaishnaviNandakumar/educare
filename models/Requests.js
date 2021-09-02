// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  }
});
// Export the model
module.exports = mongoose.model("Requests", userSchema);
