const express = require('express')
const router = express.Router()
const { setScreen, setTextField } = require('../controllers/screenController')

router.route('/:id').post(setScreen)
router.route('/element/:screenId').post(setTextField)

module.exports = router