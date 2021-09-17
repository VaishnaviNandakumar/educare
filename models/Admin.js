// user.model.js
const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  adminID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    index: true,
  },
});
// Export the model
module.exports = mongoose.model("Admin", userSchema);
