const express = require('express')
const router = express.Router()
const { setScreen, setSection } = require('../controllers/screenController')

router.route('/:id').post(setScreen)
router.route('/section/:id').post(setSection)

module.exports = router