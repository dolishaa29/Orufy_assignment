let usermodel=require("../model/user");
const express = require("express");
let router = express.Router();
let auth=require("../middleware/user");

router.post('/addproduct',auth);
router.get('/viewproducts',auth);
router.put('/editproduct',auth);
router.delete('/deleteproduct',auth);


module.exports=router;