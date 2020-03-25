const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");//import userController

router.post("/signup", userController.signup);//get signup function from userController

router.post("/login", userController.login);//get login function from userController

router.delete(
  "/delAll/",
  userController.deleteAllUser
);
router.get(
  "/user",
  
  
  userController.getUser
);
router.get(
  "/users",
  userController.allowIfLoggedin,
  
  userController.getUser
);
router.delete(
  "/user/:userId",
  userController.deleteUser
);

module.exports = router;