let usermodel=require("../model/user");
const express = require("express");
const { register, login } = require("../service/user");
let router = express.Router();

router.post("/register",register);
router.post("/login",login);

module.exports=router;