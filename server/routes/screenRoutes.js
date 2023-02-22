const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  setScreen,
  getScreen,
  updateScreenPosition,
  updateScreen,
  deleteScreen,
} = require("../controllers/screenController");

// params: courseId, screenId
router.route("/").put(protect, updateScreen).delete(protect, deleteScreen);
// params: courseId
router
  .route("/:courseId")
  .post(protect, setScreen)
  .put(protect, updateScreenPosition);
router.route("/:screenId").get(protect, getScreen);

module.exports = router;
