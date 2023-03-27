const express = require('express');
const UserSchema = require('../config/User');
const router = express.Router();
const { getUsers, addUser, getOneUser, depositOneUser, addCreditOneUser, withdrawMoneyOneUser, tranferFromOneUser } = require('../controllers/userControllers');



router.route('/').get(getUsers);

router.route('/').post(addUser);

router.route('/:id').get(getOneUser);

router.route('/:id/deposit').put(depositOneUser);

router.route('/:id/addCredit').put(addCreditOneUser);

router.route('/:id/withdraw').put(withdrawMoneyOneUser);

router.route('/:id/transfer').put(tranferFromOneUser);

router.route('/:id/deposit').get(getOneUser);



module.exports = router;

