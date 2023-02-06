const express = require("express");
const router = express.Router();
const {
  getCourse,
  setCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, setCourse);
router.route("/all").get(protect, getAllCourses);
router
  .route("/:id")
  .get(protect, getCourse)
  .delete(protect, deleteCourse)
  .put(protect, updateCourse);

module.exports = router;
