const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const multer = require('multer')

const Course = require('../models/Course')
const { Screen, Picture, TextField, H5P } = require('../models/Screen');

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
        await course.save()

        // may change to screen later
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// tested
const setSection = asyncHandler(async (req, res) => {  
    try {
        const { sectionName, index } = req.body
        const course = await Course.findById(req.params.id)
        if (!sectionName || !index) {
            throw new Error('Please add valid variables for the section')
        }
        if (!course) {
            throw new Error('Course not found')
        }
        if (course.screens.length <= index) {
            throw new Error('Please add a screen before adding a section')
        }
        //To Do: check if there already exists a section with the same name or index
        course.sections.push({sectionName: sectionName, index: index})
        await course.save()
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
        await screen.save()

        res.status(201).json(screen)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const setPicture = asyncHandler(async (req, res) => {

    try {
        const upload = multer({storage: multer.memoryStorage()}).single('image')
        upload(req, res, async (err) => {
            if (err) {
                res.status(400).json({error: err.message})
            }
            // create picture
            const picture = new Picture({
                data: req.file.buffer,
                picType: req.file.mimetype
            })
            await picture.save()
            // add picture to screen
            const screen = await Screen.findById(req.params.screenId)
            screen.elements.push(picture)
            await screen.save()
            res.status(201).json(screen)
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

/**
 * To Do: integrate H5P and handle the data
 */
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

const updateScreenPosition = asyncHandler(async (req, res) => {
    const { screenId, newIndex } = req.body
    try {
        // check course and new index
        const course = await Course.findById(req.params.id)
        if (!course) {  
            throw new Error('Course not found')
        } else if(course.screens.length <= newIndex) {
            throw new Error('New index is out of bounds')
        }
        course.updateScreenPosition(screenId, newIndex)
        await course.save()
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const updateSection  = asyncHandler(async (req, res) => {
    const { sectionName, index, position } = req.body
    try {
        if (!sectionName || !index || !position) {
            throw new Error('Please add valid variables for the section')
        }
        const course = await Course.findById(req.params.id)
        if (!course) {
            throw new Error('Course not found')
        }
        if (course.sections.length <= position) {
            throw new Error('Position is out of bounds')
        }
        if (course.screens.length <= index) {
            throw new Error('Please add a screen before adding a section')
        }
        //To Do: check if there already exists a section with the same name or index
        course.sections.set(position, {sectionName: sectionName, index: index})
        await course.save()
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


module.exports = {
    setScreen,
    setSection,
    setTextField,
    setPicture,
    setH5P,
    updateScreenPosition,
    updateSection
}