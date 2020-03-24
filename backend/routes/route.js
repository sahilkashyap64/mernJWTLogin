const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");//import userController

router.post("/signup", userController.signup);//get signup function from userController

router.post("/login", userController.login);//get login function from userController

module.exports = router;