const mongoose = require('mongoose');
const Course = require('../models/Course')

const createCourse = async (req, res) => {
    const {accountId, courseName} = res.body;

    try {
        const course = await Course.create({accountId, courseName});
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getCourse = async (req, res) => {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(404).json({error: 'no such course'});
    }

    const course = await Course.findById(courseId);

    if (!workout) return res.status(404).json({error: 'no such course'});

    return res.status(200).json(course);
};

const getAllCourses 

const rename

const delete

const share