const { default: mongoose } = require('mongoose');
const MongoDBAccess = require('./MongoDBAccess');
const Course = require('../databases/Course');
const Element = require('../databases/Element');

/**
 * The CourseModel class is a database access class to save and load data of a distinct Course. It extends from its super class 
 * MongoDBAccess.
 */
class CourseModel extends MongoDBAccess {
    constructor() {
        super();
    }

    /**
     * This method creates a new Screen in the MongoDB collection Course.
     * @param {Screen} screen Object of lib/Screen
     */
    async createScreen(screen) {

    }

    /**
     * This method adds a new Section to a Course.
     * @param {String} courseId
     * @param {Section} section Object of lib/Section
     */
    async createSection(courseId, section) {

    }

    /**
     * This method creates a new TextField in the collection Element and refers it to a Screen on a Course.
     * @param {String} courseId 
     * @param {Number} screenIndex The array index of the Screen.
     * @param {TextField} textField Object of lib/TextField
     */
    async createTextField(courseId, screenIndex, textField) {

    }

    /**
     * This method creates a new Picture in the collection Element and refers it to a Screen on a Course.
     * @param {String} courseId 
     * @param {Number} screenIndex The array index of the Screen.
     * @param {Picture} picture Object of lib/Picture
     */
    async createPicture(courseId, screenIndex, picture) {

    }

    /**
     * This method creates a new Activity in the collection Element and refers it to a Screen on a Course.
     * @param {String} courseId 
     * @param {Number} screenIndex The array index of the Screen.
     * @param {Activity} activity Object of lib/Activity
     */
    async createActivity(courseId, screenIndex, activity) {

    }

    /**
     * This method updates the position of a Screen in a Course. 
     * @param {String} courseId 
     * @param {Number} screenIndex The previous Screen index.
     * @param {Number} newScreenIndex The new Screen index.
     */
    async updateScreenPosition(courseId, screenIndex, newScreenIndex) {

    }

    /**
     * This method updates a Screen itself. An example is the order of elements that are placed on it.
     * @param {String} courseId 
     * @param {Number} screenIndex
     * @param {Screen} screen Object of lib/Screen
     */
    async updateScreen(courseId, screenIndex, screen) {

    }

    /**
     * This method deletes a Screen in the array screens of a course.
     * @param {String} courseId 
     * @param {Number} screenIndex 
     */
    async deleteScreen(courseId, screenIndex) {

    }

    /**
     * This method deletes a distinct Section from a course.
     * @param {String} courseId 
     * @param {Section} section Object of lib/Section
     */
    deleteSection(courseId, section) {

    }

    /**
     * This method deletes an Element and all references to it.
     * @param {String} courseId 
     * @param {Number} screenIndex 
     * @param {Number} elementIndex 
     */
    deleteElement(courseId, screenIndex, elementIndex) {

    }
}

module.exports = CourseModel;