const UserSchema = require("../config/User");



// Get all users
//  @route GET /users
// table: username, passportId, cash, credit, active


const getUsers = async (req, res, next) => {

  try {
    const users = await UserSchema.find();

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};



// Add user 
//  @route Post /users
// 2. When fetching users, make sure they exist wtf does that mean
// no duplicates allowed 
// form Input in client: {username: string}
// navigate to all users table after form submit

const addUser = async (req, res, next) => {
  console.log(req.body);

  try {
    const newUser = { ...req.body, cash: 0, credit: 0, passportId: Math.floor((Math.random() * 1000000000) + 1), isActive: true };
    const addedUser = await UserSchema.create(newUser);

    res.status(201).json({ // 201 means create a resource
      success: true,
      data: addedUser
    });

  } catch (error) {
    res.status(400).json({ success: false });

  }
};





// view single user
//  @route get /users/:id
// row: username, passportId, cash, credit, isActive.

const getOneUser = async (req, res, next) => {

  try {
    const user = await UserSchema.findById(req.params.id);
    console.log(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false });
      // return next(error);

    }
    res.status(200).json({ data: user });

  } catch (error) {
    res.status(400).send(error);
    // next(error);
  }
};


// deposit  single user
//  @route get /users/:id/deposit
// Only number and positive deposit, limit by 10k maybe?
// links: deposite, update, withdraw, transfer.

const depositOneUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    console.log(req.params.id);
    const amount = parseInt(req.body.amount);

    if (!user || typeof amount !== 'number' || amount < 1 || amount > 50000) {
      return res.status(400).json({ success: false });

    }


    user.cash += amount;
    await user.save();
    res.status(200).json({ success: true, amount: amount, balance: user.cash, max: 50000 });
  } catch (error) {
    next(error);
  }
};



// addCredit single user
//  @route get /users/:id/addCredit
// Only number and positive addCredit, limit by 10k maybe?
// navigate to /:id

const addCreditOneUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const amount = req.body.amount;
    if (!user || typeof amount !== 'number' || amount < 1 || amount > 50000) {
      // return res.status(400).json({ success: false });
      return next(error);
    }

    user.credit += amount;
    await user.save();
    res.status(200).json({ success: true, amount: amount, credit: user.credit, max: 50000 });
  } catch (error) {
    // res.status(400).send(error);
    next(error);
  }
};



// withdrawMoney single user
//  @route get /users/:id/withdraw
// Only number, remove cash first from user. If it reaches 0, then remove credit until it also reaches 0
// prevent if both cash and credit are 0
// navigate to /:id


const withdrawMoneyOneUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const amount = req.body.amount;
    if (!user || typeof amount !== 'number' || amount < 1 || amount > 50000) {
      return res.status(400).json({ success: false, msg: "wrong Input" });
    }

    if (user.cash < amount) {
      const remainingAmount = amount - user.cash;
      if (remainingAmount <= user.credit) {
        user.credit -= remainingAmount;
        user.cash = 0;
      } else {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
    } else {
      user.cash -= amount;
    }
    await user.save();
    res.status(200).json({ success: true, amount: amount, balance: user.cash, credit: user.credit });

  } catch (error) {
    // res.status(400).send(error);
    next(error);
  }
};




// tranfer from user a to user b
//  @route get /users/:id/transfer
// Only number, remove cash first from user. If it reaches 0, then remove credit until it also reaches 0
// prevent if both cash and credit are 0
// select user by username to increase their cash
// navigate to /:id


const tranferFromOneUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const recievedUser = await UserSchema.findOne({ username: req.body.username });
    const amount = req.body.amount;

    if (!user || !recievedUser || typeof amount !== 'number' || amount < 1 || amount > 50000) {
      return res.status(400).json({ success: false });
    }

    if (user.cash < amount) {
      const remainingAmount = amount - user.cash;
      if (remainingAmount <= user.credit) {
        user.credit -= remainingAmount;
        user.cash = 0;
      } else {
        return res.status(400).json({ success: false, message: 'Insufficient funds' });
      }
    } else {
      user.cash -= amount;
    }

    recievedUser.cash += amount;

    await user.save();
    await recievedUser.save();
    res.status(200).json({ success: true, amount: amount, senderBalance: user.cash, senderCredit: user.credit, recipientBalance: recievedUser.cash });


  } catch (error) {
    // res.status(400).send(error);
    next(error);
  }
};


module.exports = { getUsers, addUser, getOneUser, depositOneUser, addCreditOneUser, withdrawMoneyOneUser, tranferFromOneUser };