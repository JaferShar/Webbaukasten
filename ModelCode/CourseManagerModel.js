const { default: mongoose } = require('mongoose');
const MongoDBAccess = require('./MongoDBAccess');
const { courseSchema } = require('./schema');

/**
 * The CourseManagerModel class is a database access class to manage access of courses. It extends from is super class 
 * MongoDBAccess.
 */
class CourseManagerModel extends MongoDBAccess {
    constructor() {
        super();
        this.model = mongoose.model('Course', courseSchema);
    }

    /**
     * This method creates a new Course document in MongoDB collection Course.
     * @param {Course} course Object of lib/Course
     */
    async create(course) {

    }

    /**
     * This method gets an Course by its identifier.
     * @param {String} identifier  
     */
    async getCourse(identifier) {

    }

    /**
     * This method gets all Courses related to an Account ID.
     * @param {String} identifier  
     */
    async getAllCourses(identifier) {

    }

    /**
     * 
     * @param {*} identifier 
     * @param {*} name 
     */
    async rename(identifier, name) {

    }

    /**
     * This method deletes one Account from the collection Account by its identifier. The identifier could be either
     * an Account identifier nor an email to identifiy the Account document.
     * @param {String} identifier 
     */
    async delete(identifier) {

    }
}