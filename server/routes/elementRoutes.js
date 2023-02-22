const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  setTextField,
  setPicture,
  setH5P,
  deleteElement,
  exchangeElement,
} = require("../controllers/screenController");

// params: screenId, elementId
router.route("").delete(protect, deleteElement).post(protect, exchangeElement);
// params: screenId
router.route("/textfield/:screenId").post(protect, setTextField);
// params: screenId
router.route("/picture/:screenId").post(protect, setPicture);
// params: screenId
router.route("/h5p/:screenId").post(protect, setH5P);

module.exports = router;
