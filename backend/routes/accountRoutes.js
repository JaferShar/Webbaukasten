const express = require('express')
const router = express.Router()
const {registerAccount, loginAccount, getMe} = require('../controllers/accountController')

router.post('/', registerAccount)
router.post('/login', loginAccount)
router.get('/me', getMe)

module.exports = router