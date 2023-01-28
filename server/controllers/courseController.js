const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Course = require('../models/Course')
const Account = require('../models/Account')
const Screen = require('../models/Screen').Screen

const getCourse = asyncHandler(async (req, res) => {
    /**
     * TO DO: populate elements
     */
    const course = await Course.findById(req.params.id)//.populate('Element')

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }
    
    res.status(200).json(course)
})

const setCourse = asyncHandler(async (req, res) => {
    if (!req.body.courseName) {
        res.status(400)
        throw new Error('Please add course name')
    }
    const {accountId, courseName} = req.body

    try {
        const screen = await Screen.create({template: 'Welcome'})
        const course = await Course.create({
            account: accountId,
            courseName: courseName
        })
        course.screens.push(screen)
        course.save()
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find()

    res.status(200).json({courses})
});

const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.status(200).json(updatedCourse)
})

const deleteCourse = asyncHandler(async (req, res) => {
    const course = (await Course.findById(req.params.id))

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }
    /**
     * TO DO: delete elements of all screens
     */

    await course.remove()
    res.status(200).json({message: `Deleted course ${req.params.id}`})
})

/**
 * To DO: share
 */
const shareCourse = asyncHandler( async (req, res) => {
    //api/share/:id/:email
    const email = req.body

    const account = Account.find({email: email})

    if (!account) {
        res.status(400)
        throw new Error('Account not found')
    }

    
})

module.exports = {
    getCourse,
    setCourse,
    getAllCourses,
    updateCourse, 
    deleteCourse,
    shareCourse,
}


