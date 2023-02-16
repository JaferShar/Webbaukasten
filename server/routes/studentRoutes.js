const express = require("express");
const router = express.Router();
const {
    getCourseData,
    getScreenData
} = require("../controllers/studentController");


router.route("/course/:id").get(getCourseData);
router.route("/screen/:id").get(getScreenData);
module.exports = router;
