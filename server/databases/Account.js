const mongoose = require('mongoose');
const googleOAuth = require('googleOAuth')
const profile = await googleOAuth.getProfileInfo(code)

const accountSchema = new mongoose.Schema({
  googleId: profile.sub,
  firstName: String,
  lastName: String,
  email: {type: String, required: true},
  token: String,
});

module.exports = mongoose.model("Account", accountSchema);