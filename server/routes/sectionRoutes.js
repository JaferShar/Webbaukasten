const express = require("express");
const router = express.Router();
const {
  setSection,
  updateSection,
  deleteSection,
} = require("../controllers/screenController");

router.route("/:id").post(setSection).put(updateSection).delete(deleteSection);

module.exports = router;
