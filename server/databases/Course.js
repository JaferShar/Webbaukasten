const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    courseName: {
        type: String,
        required: true
    },
    section: [{
        sectionName: String,
        StartIndex: Number,
    }],
    screens: [screenSchema]
})

const screenSchema = new mongoose.Schema({
    template: {
        type: String,
        required: true,
        immutable: true,
    },
    elements: [{type: mongoose.Schema.Types.ObjectId, ref:'Element'}]
})

module.exports = mongoose.model("Course", courseSchema);