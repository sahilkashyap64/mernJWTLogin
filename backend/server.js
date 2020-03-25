//express
const express = require("express");
const app = express();
const path = require("path");

const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
require("dotenv").config({
  path: path.join(__dirname, "./.env")
});
const PORT = process.env.PORT || 5000;
const routes = require("./routes/route");//imports routes
//imports
const morgan = require("morgan");
var cors = require('cors');
const { handleError, ErrorHandler } = require('./helpers/error')

//mongodb
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mernnewbackend", { useNewUrlParser: true, useUnifiedTopology: true,autoIndex: true ,  useCreateIndex: true,})
  .then(() => {
    console.log("Connected to the Database successfully");
  });
//middlewares
app.use(express.json());
app.use(morgan("dev"));//this will log all the http request in console
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userbd, exp } = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one"
      });
    }
    res.locals.loggedInUser = await User.find(userbd);
    next();
  } else {
    next();
  }
});
app.use(cors()); //for dealing with cross orgin policy
app.use("/", routes); //importing routes from route file
app.use((err, req, res, next) => {
  handleError(err, res);
});//handle error


//server
app.listen(PORT, function() {
  console.log("Server is listening on Port:", PORT);
});