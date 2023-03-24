const express = require('express');

const router = express.Router();



// Get all users
//  @route GET /users

const getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check get all users' });
};


router.route('/').get(getUsers);


// Add user 
//  @route Post /users
// 2. When fetching users, make sure they exist wtf does that mean
// no duplicates allowed 
// default 0 cash 0 credit

const addUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check add a user' });
};


router.route('/').post(addUser);


// view single user
//  @route get /users/:id
// details: username, passportId, cash, credit, isActive, 

const getOneUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check view one user', middleware: req.secretMsg });
};


router.route('/:id').get(getOneUser);


// deposit  single user
//  @route get /users/:id/deposit
// Only number and positive deposit, limit by 10k maybe?, 

const depositOneUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check deposit one user' });
};


router.route('/:id/deposit').put(depositOneUser);


// addCredit single user
//  @route get /users/:id/addCredit
// Only number and positive addCredit, limit by 10k maybe?

const addCreditOneUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check addCredit one user' });
};


router.route('/:id/addCredit').put(addCreditOneUser);



// withdrawMoney single user
//  @route get /users/:id/withdraw
// Only number, remove cash first from user. If it reaches 0, then remove credit until it also reaches 0
// prevent if both cash and credit are 0

const withdrawMoneyOneUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check withdraw Money one user' });
};


router.route('/:id/withdraw').put(withdrawMoneyOneUser);



// tranfer from user a to user b
//  @route get /users/:id/transfer
// Only number, remove cash first from user. If it reaches 0, then remove credit until it also reaches 0
// prevent if both cash and credit are 0
// select user by passport Id to increase their cash

const tranferFromOneUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'check tranfer from one user' });
};


router.route('/:id/transfer').put(tranferFromOneUser);



module.exports = router;
