//express
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "./.env")
});
const PORT = process.env.PORT || 3000;
const routes = require("./routes/route");//imports routes
//imports
const morgan = require("morgan");
var cors = require('cors');
const { handleError, ErrorHandler } = require('./helpers/error')

//mongodb
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mernbackend", { useNewUrlParser: true, useUnifiedTopology: true,autoIndex: true ,  useCreateIndex: true,})
  .then(() => {
    console.log("Connected to the Database successfully");
  });
//middlewares
app.use(express.json());
app.use(morgan("dev"));//this will log all the http request in console
app.use(cors()); //for dealing with cross orgin policy
app.use("/", routes); //importing routes from route file
app.use((err, req, res, next) => {
  handleError(err, res);
});//handle error


//server
app.listen(PORT, function() {
  console.log("Server is listening on Port:", PORT);
});