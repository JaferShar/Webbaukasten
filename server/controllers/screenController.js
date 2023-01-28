const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Course = require('../models/Course')
const { Screen, Picture, TextField, H5P } = require('../models/Screen')

const setScreen = asyncHandler(async (req, res) => {
    const { courseId, template } = req.body.template
    if (!template) {
        res.status(400)
        throw new Error('Please select a template')
    }

    try {
        const screen = await Screen.create({
            template: template
        })
        const screenId = screen._id
        Course.findOneAndUpdate(
            {_id: courseId},
            {push: {screens: {screenId}}}
            )
        res.status(201).json(screen)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const setSection = asyncHandler(async (req, res) => {
    try {
        const { sectionName, index } = req.body
        const course = await Course.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {sections: {
                sectionName: sectionName,
                index: index
            }}}, 
            { new: true }
            )
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = {
    setScreen,
    setSection,
}