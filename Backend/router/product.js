let usermodel = require("../model/user");
const express = require("express");
let router = express.Router();
let auth = require("../middleware/user");
const upload = require("../middleware/multer"); 
const cloudinary = require("../config/cloudinary");

const {addproduct,viewproduct,editproduct,deleteproduct, explore, singleproductexplore} = require("../controller/product");
const { singleproduct } = require("../service/product");


router.post("/addproduct",auth,upload.single("Images"),addproduct);
router.get("/viewproduct", auth, viewproduct);
router.put("/editproduct/:id",auth,upload.single("image"),editproduct);
router.delete("/deleteproduct/:id", auth, deleteproduct);
router.get("/singleproduct/:id",auth,singleproduct);
router.get('/explore',explore);
router.get('/singleproductexplore',singleproductexplore);

module.exports = router;