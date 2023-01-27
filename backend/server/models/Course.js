const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        //required: true
    },
    courseName: {type: String, required: true},
    section: {type: [{
        sectionName: {
            type: String,
        },
        StartIndex: {
            type: Number,
        },
        },],
        default: function() {
            return [{sectionName: this.courseName, startIndex: 0}]
        }
    },
    screens: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Screen'
    },
})

//create function
module.exports = mongoose.model('Course', courseSchema)