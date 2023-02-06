const express = require("express");
const router = express.Router();
const {
  setTextField,
  setPicture,
  setH5P,
  deleteElement,
} = require("../controllers/screenController");

// params: screenId, elementId
router.route("/:screenId").delete(deleteElement);
// params: screenId
router.route("/textfield/:screenId").post(setTextField);
// params: screenId
router.route("/picture/:screenId").post(setPicture);
// params: screenId
router.route("/h5p/:screenId").post(setH5P);

module.exports = router;
