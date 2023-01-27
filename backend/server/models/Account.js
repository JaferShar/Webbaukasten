const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  //googleId: String,
  firstName: {
    type: String, 
    required: [true, 'Please add a firstName']
  }, 

  lastName: {
    type: String, 
    required: [true, 'Please add a lastName']
  },

  email: {
    type: String, 
    required: [true, 'Please add a email'],
    unique: true
  },

  //token: String,
});

module.exports = mongoose.model("Account", accountSchema);