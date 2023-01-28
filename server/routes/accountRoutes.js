const express = require('express')
const router = express.Router()
const {registerAccount, loginAccount, getMe} = require('../controllers/accountController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerAccount)
router.post('/login', loginAccount)
router.get('/me', protect, getMe)

module.exports = router