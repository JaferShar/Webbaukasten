const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Course = require("../models/Course");

const getCourseData = asyncHandler(async (req, res) => {
  try {
    // get course
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getScreenData = asyncHandler(async (req, res) => {
    try {
      const screen = await Screen.findById(req.params.screenId);
      if (!screen) {
        return res.status(404).json({ error: "Screen not found" });
      }
  
      res.status(200).json(screen);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
    getCourseData,
    getScreenData
  };
