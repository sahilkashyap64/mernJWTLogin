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
    const { email, password } = req.body;
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
      email,
      password: hashedPassword,
    
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );
    newUser.accessToken = accessToken;
   await newUser.save();
    res.json({ data: newUser,accessToken });
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
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res
      .status(200)
      .json({ data: { email: user.email }, accessToken });
  } catch (error) {
    next(error);
  }
};