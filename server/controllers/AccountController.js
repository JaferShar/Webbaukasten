const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const Account = require('../models/Account');

const account = await Account.create(firstName, surname, email);

/**
 * create
 * exists
 * update
 * get
 */

const getAccount = asyncHandler(async (req, res) => {
  res.status(200).json(req.account);
})