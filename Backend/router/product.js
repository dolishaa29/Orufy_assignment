let usermodel=require("../model/user");
const express = require("express");
let router = express.Router();
let auth=require("../middleware/user");
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

const { addproduct, viewproduct, editproduct, deleteproduct } = require("../controller/product");

router.post('/addproduct',upload.single(Images),auth,addproduct);
router.get('/viewproduct',auth,viewproduct);
router.put('/editproduct/:id',upload.single(Images),auth,editproduct);
router.delete('/deleteproduct/:id',auth,deleteproduct);


module.exports=router;