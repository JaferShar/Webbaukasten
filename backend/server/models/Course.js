const mongoose = require('mongoose')

const screenSchema = new mongoose.Schema({
    template: {
        type: String,
        default: 'Welcome',
        required: true,
        immutable: true,
    },
    elements: [{type: mongoose.Schema.Types.ObjectId, ref:'Element'}]
})

const courseSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
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
    }},
    screens: [screenSchema]
})

//create function
module.exports = mongoose.model('Course', courseSchema)