const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Course = require("../models/Course");
const Account = require("../models/Account");
const Screen = require("../models/Screen").Screen;

const getCourse = asyncHandler(async (req, res) => {
  try {
    // get course
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    } else if (course.account != req.account.id) {
      return res.status(401).json({ error: "Access denied." });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const setCourse = asyncHandler(async (req, res) => {
  const { courseName } = req.body;
  const accountId = req.account.id;
  try {
    if (!courseName) {
      return res.status(400).json({ error: "Please provide a course name." });
    }

    // checks if there already exists an document with the given filters
    const count = await Course.countDocuments({
      account: accountId,
      courseName: courseName,
    });
    if (count > 0) {
      return res.status(400).json({ error: "This course already exists" });
    }

    // create course
    const course = await Course.create({
      account: accountId,
      courseName: courseName,
    });

    // create Welcome screen
    const screen = await Screen.create({template: "Welcome"});

    // push screen
    course.screens.push(screen);

    course.save();

    res.status(201).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({ account: req.account.id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  try {
    const { courseName } = req.body;
    if (!courseName) {
      return res.status(400).json({ error: "Please provide a course name." });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    } else if (course.account != req.account.id) {
      return res.status(401).json({ error: "Access denied" });
    }

    // update course
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { courseName },
      { new: true }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    } else if (course.account.toString() !== req.account.id) {
      return res.status(401).json({ error: "Access denied." });
    }

    // remove screens
    await Screen.deleteMany({ _id: { $in: course.screens } });
    // remove course
    await course.remove();

    res.status(200).json({id: courseId});   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// tested
const shareCourse = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Please provide an email address." });
    }

    const course = await Course.findById(req.params.id).populate('screens');
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    } else if (course.account != req.account.id) {
      return res.status(401).json({ error: "Access denied" });
    }

    
    const account = await Account.findOne({ email: email });
    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    const newSections = course.sections.map((section) => {
      return {
        _id: new mongoose.Types.ObjectId(),
        sectionName: section.sectionName,
        index: section.index
      };
    });

    // create new course with data
    const newCourse = await Course.create({
      account: account._id,
      courseName: course.courseName,
      sections: newSections,
    });
    
    // create new screens with data
    const newScreens = await Promise.all(
      course.screens.map(async (screen) => {
        const newScreen = await Screen.create({
          template: screen.template,
          elements: screen.elements,
        });
        return newScreen;
      })
    );
    console.log(newScreens)

    // push screens to course
    newCourse.screens = newScreens;
    await newCourse.save();

    // res.status(201).json({ message: `Course shared with ${email}` });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getCourse,
  setCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  shareCourse,
};
