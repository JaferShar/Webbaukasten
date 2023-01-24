const { default: mongoose } = require('mongoose');
const MongoDBAccess = require('./MongoDBAccess');
const { courseSchema } = require('./schema');

/**
 * The CourseManagerModel class is a database access class to manage access of courses. It extends from its super class 
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
     * This method renames an existing course.
     * @param {*} identifier 
     * @param {*} name 
     */
    async rename(identifier, name) {

    }

    /**
     * This method deletes a Course from the collection Course by its identifier.
     * @param {String} identifier 
     */
    async delete(identifier) {

    }

    /**
     * This method shares a distinct course of one user to an other user.
     * In the database a new course is created with the data of the old course and the identifier of the account.
     * @param {Account} account Object of lib/Account
     * @param {Course} course Object of lib/Course
     */
    async share(account, course) {

    }
}