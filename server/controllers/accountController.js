const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/Account')
const Account = require('../models/Account')

//@desc     Register new account
//@route    POST /api/account
//@access   Public
const registerAccount = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body

    if (!firstName || !lastName || !email) {

        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if Account already exists
    const accountExists = await Account.findOne({ email })

    if (accountExists) {
        res.status(400)
        throw new Error('Account already exists')
    }

    //Create Account
    const account = await Account.create({
        firstName: firstName, 
        lastName: lastName,
        email: email,
    })

    if (account) {
        res.status(201).json({
            _id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            token: generateToken(account._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

//@desc     Authenticate new User
//@route    POST /api/account/login
//@access   Public
const loginAccount = asyncHandler(async (req, res) => {
    const {email} = req.body

    //check for Account email
    const account = await Account.findOne({ email })
    
    if (account) {
        res.json({
            _id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            token: generateToken(Account.id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials for login')
    }
})

//@desc     Get user data
//@route    GET /api/account/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, firstName, lastName, email} = await Account.findById(req.account.id)

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email
    })

})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerAccount,
    loginAccount,
    getMe
}