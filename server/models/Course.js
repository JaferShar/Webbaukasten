const mongoose = require("mongoose");

/**
 * This mongoose schema defines the structure of a course document in the database.
 */
const courseSchema = new mongoose.Schema({
  // The account that owns this course is referenced as ObjectId.
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  courseName: { type: String, required: true },
  sections: {
    type: [
      {
        sectionName: {
          type: String,
          required: true,
          default: this.courseName,
        },
        index: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    // set default value to the sections array with one section
    default: function () {
      return [{ sectionName: this.courseName, startIndex: 0 }];
    },
  },
  // The screens that belong to this course are referenced as ObjectId.
  screens: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Screen",
  },
});

/**
 * This method changes the position of a screen in the course.
 * @param {ObjectId} screenId the screen to move
 * @param {int} newIndex the new index of the screen
 */
courseSchema.methods.updateScreenPosition = function (screenId, newIndex) {
  const screenIndex = this.screens.indexOf(screenId);
  if (screenIndex === -1) {
    throw new Error("Screen not found in course screens");
  }
  // Remove the screen from the array and insert it at the new index.
  this.screens.splice(screenIndex, 1);
  this.screens.splice(newIndex, 0, screenId);
};

/**
* Export the schema as a mongoose model.
*/
module.exports = mongoose.model("Course", courseSchema);
