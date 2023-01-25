class Course {
    constructor(courseId, accountId, courseName) {
        this.courseId = courseId;
        this.accountId = accountId;
        this.courseName = courseName;
    }

    // getters
    getCourseId() {
        return this.courseId;
    }

    getAccountId() {
        return this.accountId;
    }

    getCourseName() {
        return this.courseName;
    }

    // setters
    setCourseId(courseId) {
        this.courseId = courseId
    }

    setAccountId(accountId) {
        this.accountId = accountId;
    }

    setCourseName(courseName) {
        this.courseName = courseName;
    }
}

module.exports = Course;