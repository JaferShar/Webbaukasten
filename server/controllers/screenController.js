const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const Course = require("../models/Course");
const { Screen, Picture, TextField, H5P } = require("../models/Screen");

const setScreen = asyncHandler(async (req, res) => {
  const { template } = req.body;
  try {
    if (!template) {
      return res.status(400).json({ error: "Please select a valid template" });
    }
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const screen = await Screen.create({ template: template });
    course.screens.push(screen);
    await course.save();

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// tested
const setSection = asyncHandler(async (req, res) => {
  try {
    const { sectionName, index } = req.body;
    const course = await Course.findById(req.params.id);
    if (!sectionName || !index) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the section" });
    }
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (course.screens.length <= index) {
      return res
        .status(400)
        .json({ error: "Please add a screen before adding a section" });
    }
    for (let i = 0; i < course.sections.length; i++) {
      if (course.sections[i].sectionName === sectionName) {
        return res
          .status(400)
          .json({ error: "There already exists a section with the same name" });
      }
      if (course.sections[i].index === index) {
        return res.status(400).json({
          error: "There already exists a section with the same index",
        });
      }
    }

    // add section
    course.sections.push({ sectionName: sectionName, index: index });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const setTextField = asyncHandler(async (req, res) => {
  try {
    const text = req.body.text;
    const screen = await Screen.findById(req.params.screenId);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }
    const textField = await TextField.create({ text: text });
    screen.elements.push(textField);
    await screen.save();

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const setPicture = asyncHandler(async (req, res) => {
  const { url } = req.body;
  try {
    if (!url) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the H5P" });
    }
    const screen = await Screen.findById(req.params.screenId);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }
    const picture = await Picture.create({ url: url });
    screen.elements.push(picture);
    screen.save();

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * To Do: integrate H5P and handle the data
 */
const setH5P = asyncHandler(async (req, res) => {
  const { content } = req.body;
  try {
    if (!content) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the H5P" });
    }
    const screen = await Screen.findById(req.params.screenId);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }
    const h5p = await H5P.create({ content: content });
    screen.elements.push(h5p);
    screen.save();

    res.status(201).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getScreen = asyncHandler(async (req, res) => {
  try {
    if (!req.params.screenId) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the screen" });
    }
    const screen = await Screen.findById(req.params.screenId);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateScreenPosition = asyncHandler(async (req, res) => {
  try {
    const { screenId, newIndex } = req.body;
    if (!screenId || !newIndex) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the screen" });
    }

    // check course and new index
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      throw new Error("Course not found");
    } else if (course.screens.length <= newIndex) {
      throw new Error("New index is out of bounds");
    }

    course.updateScreenPosition(screenId, newIndex);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateSection = asyncHandler(async (req, res) => {
  const { sectionName, index, position } = req.body;
  try {
    if (!sectionName || !index || !position) {
      return res
        .status(400)
        .json({ error: "Please provide valid inputs for the section" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (course.sections.length <= position) {
      return res.status(400).json({ error: "Position is out of bounds" });
    }
    if (course.screens.length <= index) {
      return res.status(400).json({ error: "Index is out of bounds" });
    }
    for (let i = 0; i < course.sections.length; i++) {
      if (course.sections[i].sectionName === sectionName) {
        return res
          .status(400)
          .json({ error: "There already exists a section with the same name" });
      }
      if (course.sections[i].index === index) {
        return res.status(400).json({
          error: "There already exists a section with the same index",
        });
      }
    }

    course.sections.set(position, { sectionName: sectionName, index: index });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// since here methods are not fully integrated, they are not tested

// updateScreen function does not notices if element was deleted. May add functionallity to delete or create elements later
const updateScreen = asyncHandler(async (req, res) => {
  try {
    const screenId = req.query.param1;
    const { elements } = req.body;
    if (!elements) {
      return res.status(400).send({ error: "Invalid request" });
    }

    // get screen
    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(400).send({ error: "Screen not found" });
    }

    // iterate through elements
    elements.forEach(async (element) => {
      const { _id, elementType } = element;

      // select element type
      switch (elementType) {
        case "Picture":
          // update picture
          creen.elements.id(_id).set({ data: element.data });
          break;
        case "TextField":
          // update text field
          screen.elements.id(_id).set({ text: element.text });
          break;
        case "H5P":
          // update H5P
          creen.elements.id(_id).set({ content: element.content });
          break;
        default:
          return res.status(400).send({ error: "Invalid element type" });
      }
    });
    // save changes
    await screen.save();

    return res.status(200).send(screen);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

const deleteScreen = asyncHandler(async (req, res) => {
  try {
    const courseId = req.query.param1;
    const screenId = req.query.param2;
    // delete screen on course first
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const screen = course.screens.find(
      (screen) => screen._id.toString() === screenId
    );
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }
    course.screens.pull(screenId);

    // save changes and delete screen afterwards
    await course.save();
    await Screen.findByIdAndDelete(screenId);

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteSection = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    course.sections.id(req.params.sectionId).remove();
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteElement = asyncHandler(async (req, res) => {
  try {
    const screenId = req.query.param1;
    const elementId = req.query.param2;
    console.log(screenId, elementId)
    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }
    screen.elements.id(elementId).remove();
    await screen.save();

    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  setScreen,
  setSection,
  setTextField,
  setPicture,
  setH5P,
  getScreen,
  updateScreenPosition,
  updateSection,
  updateScreen,
  deleteScreen,
  deleteSection,
  deleteElement,
};
