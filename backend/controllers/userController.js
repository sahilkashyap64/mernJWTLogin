const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require('../helpers/error');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
//sign up
exports.signup = async (req, res, next) => {
  try {
    const { name,email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler(404, 'Missing required email and password fields');
    }
      // checking if the email provided already exist in the DB
      const email_exist=await User.findOne({email});
      
          //if it exist we are returning an error message
          if (email_exist) {
               throw new ErrorHandler(409, 'Email already exist!');
          }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    
    });
    
  
   await newUser.save();
    res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

//login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(401, 'Email does not exist!')
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      throw new ErrorHandler(404, 'Password is not correct!')
    }
    const token = jwt.sign({ userbd: user }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    
    res
      .status(200)
      .json({ ok:true,userbd:user, token });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted"
    });
  } catch (error) {
    next(error);
  }
};
//unprotected route get all users
exports.getUser = async (req, res, next) => {
  const users = await User.find({});//get all user from db
  res.status(200).json({
     users
  });
};
//delete all id
exports.deleteAllUser = async (req, res, next) => {
  try {
    
    await User.remove( { } )
    res.status(200).json({
      data: null,
      message: "User has been deleted"
    });
  } catch (error) {
    next(error);
  }
};


exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};