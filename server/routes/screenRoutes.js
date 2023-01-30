const express = require('express')
const router = express.Router()
const { setScreen, setTextField, setPicture } = require('../controllers/screenController')

router.route('/:id').post(setScreen)
router.route('/textfield/:screenId').post(setTextField)
router.route('/picture/:screenId').post(setPicture)

module.exports = router