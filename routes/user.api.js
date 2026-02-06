const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/", userController.createUser);
router.post("/signin", userController.signinWithEmail);

module.exports = router;
