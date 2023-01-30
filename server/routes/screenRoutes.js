const express = require('express')
const router = express.Router()
const { setScreen, setTextField, setPicture, updateScreenPosition } = require('../controllers/screenController')

router.route('/:id').post(setScreen).put(updateScreenPosition)
router.route('/textfield/:screenId').post(setTextField)
//router.route('/picture/:screenId').post(setPicture)

module.exports = router