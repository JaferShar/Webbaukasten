const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");
const { Screen, Picture, TextField, H5P } = require("../models/Screen");

/**
 * @desc create new screen
 * @route POST /api/screen/:courseId
 * @access Protected
 */
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

/**
 * @desc Create new Section
 * @route POST /api/section/:id
 * @access Protected
 */
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

/**
 * @desc Create new TextField
 * @route POST /api/textfield/:screenId
 * @access Protected
 */
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

/**
 * @desc Create new Picture
 * @route POST /api/picture/:screenId
 * @access Protected
 */
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
 * @desc Create new H5P
 * @route POST /api/h5p/:screenId
 * @access Protected
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

/**
 * @desc Get screen
 * @route GET /api/screen/:screenId
 * @access Protected
 */
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

/**
 * @desc Update screen position
 * @route PUT /api/screen/:courseId
 * @access Protected
 */
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

/**
 * @desc Update section
 * @route PUT /api/section/:id
 * @access Protected
 */
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

/**
 * @desc Update screen elements if they are changed
 * @route PUT /api/screen
 * @access Protected
 */
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
          screen.elements.id(_id).set({ data: element.data });
          break;
        case "TextField":
          // update text field
          screen.elements.id(_id).set({ text: element.text });
          break;
        case "H5P":
          // update H5P
          screen.elements.id(_id).set({ content: element.content });
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

/**
 * @desc Exchange element with another element
 * @route POAT /api/element/
 * @access Protected
 */
const exchangeElement = asyncHandler(async (req, res) => {
  try {
    const screenId = req.query.param1;
    const prevElementId = req.query.param2;
    const { element } = req.body;
    if (!element || !prevElementId || !screenId) {
      return res.status(400).send({ error: "Invalid request" });
    }

    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(400).send({ error: "Screen not found" });
    }

    // create element
    var newElement = null;
    switch (element.elementType) {
      case "Picture":
        newElement = await Picture.create({ url: element.url });
        break;
      case "TextField":
        newElement = await TextField.create({ text: element.text });
        break;
      case "H5P":
        newElement = await H5P.create({ content: element.content });
        break;
        default:
          return res.status(400).send({ error: "Invalid element type" });
          break;
        }
        
    if (newElement === null) {
      return res.status(400).send({ error: "Could not create new Element" });
    }

    // exchange element
    screen.elements.id(prevElementId).set(newElement);
    await screen.save();

    return res.status(200).send(screen);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/**
 * @desc Delete screen
 * @route DELETE /api/screen
 * @access Protected
 */
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

/**
 * @desc Delete section
 * @route DELETE /api/section/:id
 * @access Protected
 */
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

/**
 * @desc Delete element
 * @route DELETE /api/element/
 * @access Protected
 */
const deleteElement = asyncHandler(async (req, res) => {
  try {
    const screenId = req.query.param1;
    const elementId = req.query.param2;
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
  exchangeElement,
  deleteScreen,
  deleteSection,
  deleteElement,
};
