const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Course = require('../models/Course')
const Screen = require('../models/Screen')

const setScreen = asyncHandler(async (req, res) => {
    if (!req.body.template) {
        res.status(400)
        throw new Error('Please select a template')
    }

    try {
        const screen = await Screen.create({
            template: req.body.template
        })
        const screenId = screen._id
        Course.findOneAndUpdate(
            {_id: req.params.id},
            {push: {screens: {screenId}}}
            )
        res.status(201).json(screen)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});