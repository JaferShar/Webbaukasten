const express = require("express");
const router = express.Router();
const {
  setScreen,
  getScreen,
  updateScreenPosition,
  updateScreen,
  deleteScreen,
} = require("../controllers/screenController");

// params: courseId, screenId
router.route("/").put(updateScreen).delete(deleteScreen);
// params: courseId
router.route("/:courseId").post(setScreen).put(updateScreenPosition);
router.route("/:screenId").get(getScreen);

module.exports = router;
