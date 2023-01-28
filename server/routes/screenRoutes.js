const express = require('express')
const router = express.Router()
const { setScreen } = require('../controllers/screenController')

router.route('/:id').post(setScreen)

module.exports = router