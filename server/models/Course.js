const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    courseName: {type: String, required: true},
    sections: {type: [{
        sectionName: {
            type: String,
            required: true,
            default: this.courseName
        },
        index: {
            type: Number,
            required: true,
            default: 0
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
}, {versionKey: false})

courseSchema.methods.updateScreenPosition = function(screenId, newIndex) {
    const screenIndex = this.screens.indexOf(screenId)
    if (screenIndex === -1) {
        throw new Error('Screen not found in course screens')
    }

    this.screens.splice(screenIndex, 1)
    this.screens.splice(newIndex, 0, screenId)
}

module.exports = mongoose.model('Course', courseSchema)