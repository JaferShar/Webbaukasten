const express = require('express')
const router = express.Router()
const { setSection, updateSection } = require('../controllers/screenController')

router.route('/:id').post(setSection).put(updateSection)

module.exports = router