const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  setSection,
  updateSection,
  deleteSection,
} = require("../controllers/screenController");

router
  .route("/:id")
  .post(protect, setSection)
  .put(protect, updateSection)
  .delete(protect, deleteSection);

module.exports = router;
