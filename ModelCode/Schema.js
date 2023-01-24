const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  token: String,
});

const CourseSchema = new mongoose.Schema({
    accountID: String,
    courseName: String,
    section: [{
        sectionName: String,
        StartIndex: Number,
    }],
    screens: [{
        template: String,
        elements: [ObjectId],
    }]

})



module.exports = {
  accountSchema,
  CourseSchema,

};