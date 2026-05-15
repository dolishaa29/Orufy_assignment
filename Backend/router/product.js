let usermodel=require("../model/user");
const express = require("express");
let router = express.Router();
let auth=require("../middleware/user");
const { addproduct, viewproduct, editproduct, deleteproduct } = require("../controller/product");

router.post('/addproduct',auth,addproduct);
router.get('/viewproduct',auth,viewproduct);
router.put('/editproduct',auth,editproduct);
router.delete('/deleteproduct',auth,deleteproduct);


module.exports=router;