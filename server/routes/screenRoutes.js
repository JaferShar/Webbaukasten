const express = require("express");
const router = express.Router();
const {
  setScreen,
  updateScreenPosition,
  updateScreen,
  deleteScreen,
} = require("../controllers/screenController");

// params: courseId, screenId
router.route("/").put(updateScreen).delete(deleteScreen);
// params: courseId
router.route("/:courseId").post(setScreen).put(updateScreenPosition);

module.exports = router;
