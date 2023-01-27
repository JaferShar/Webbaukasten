const express = require('express')
const router = express.Router()
const { getCourse, setCourse, getAllCourses, deleteCourse, updateCourse } = require('../controllers/courseManagerController')

router.route('/').post(setCourse)
router.route('/all').get(getAllCourses)
router.route('/:id').get(getCourse).delete(deleteCourse).put(updateCourse)

module.exports = router