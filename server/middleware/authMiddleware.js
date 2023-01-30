const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Account = require('../models/Account')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header 
            // Header has format: 'Bearer tokenstuffaaskdlfjaklsdjf'
            // So we need just index 1 for the actual token
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get account from token
            req.account = await Account.findById(decoded.id)
            

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('not authorized, no token')
    }

})

module.exports = { protect }