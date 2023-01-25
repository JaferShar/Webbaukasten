const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: {type: String, required: true},
  token: String,
});

module.exports = mongoose.model("Account", accountSchema);