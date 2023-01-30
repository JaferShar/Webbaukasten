const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Course = require('../models/Course')
const { Screen, Picture, TextField, H5P } = require('../models/Screen')

const setScreen = asyncHandler(async (req, res) => {
    const template = req.body.template
    if (!template || template.toString() === 'Welcome') {
        res.status(400)
        throw new Error('Please select a valid template')
    }

    try {
        const screen = await Screen.create({template: template})
        const course = await Course.findById(req.params.id)
        course.screens.push(screen)
        course.save()

        // may change to screen later
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// tested
const setSection = asyncHandler(async (req, res) => {
    const { sectionName, index } = req.body
    if (!sectionName || !index) {
        throw new Error('Please add valid variables for the section')
    }
    
    try {
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

const setTextField = asyncHandler(async (req, res) => {
    const text = req.body.text
    try {
        const textField = await TextField.create({text: text})
        const screen = await Screen.findById(req.params.screenId)
        screen.elements.push(textField)
        screen.save()

        res.status(201).json(screen)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const setPicture = asyncHandler(async (req, res) => {
    
    try {
        const image = Picture.create({picType: req.header, data: req.body})
        const screen = await Screen.findById(req.params.screenId)
        screen.elements.push(image)
        screen.save()

        res.status(201).json(image)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const setH5P = asyncHandler(async (req, res) => {
    const { h5pType, data } = req.body
    try {
        const h5p = await H5P.create({h5pType: h5pType, data: data})
        const screen = await Screen.findById(req.params.screenId)
        screen.elements.push(h5p)
        screen.save()
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
module.exports = {
    setScreen,
    setSection,
    setTextField,
    //setPicture
}