const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
  surname: String,
  email: {
    type: String,
    required: true,
  },
  token: String,
});

module.exports = mongoose.model("Account", accountSchema);