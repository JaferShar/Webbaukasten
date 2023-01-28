const express = require('express')
const router = express.Router()
const { setSection } = require('../controllers/screenController')

router.route('/:id').put(setSection)

module.exports = router