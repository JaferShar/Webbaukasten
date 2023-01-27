
//@desc     Register new account
//@route    POST /api/account
//@access   Public
const registerAccount = (req, res) => {
    res.json({message: 'Register Account'})

}

//@desc     Authenticate new User
//@route    POST /api/account/login
//@access   Public
const loginAccount = (req, res) => {
    res.json({message: 'login Account'})
}

//@desc     Get user data
//@route    GET /api/account/me
//@access   Public
const getMe = (req, res) => {
    res.json({message: 'Account data display'})

}

module.exports = {
    registerAccount, 
    loginAccount, 
    getMe
}