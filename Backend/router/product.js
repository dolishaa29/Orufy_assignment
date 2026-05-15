let usermodel = require("../model/user");
const express = require("express");
let router = express.Router();

let auth = require("../middleware/user");

const upload = require("../middleware/multer"); // ✔️ FIX

const cloudinary = require("../config/cloudinary");

const {
  addproduct,
  viewproduct,
  editproduct,
  deleteproduct
} = require("../controller/product");

/* ADD PRODUCT */
router.post(
  "/addproduct",
  auth,
  upload.single("Images"),   // ✔️ FIX
  addproduct
);

/* VIEW */
router.get("/viewproduct", auth, viewproduct);

/* EDIT */
router.put(
  "/editproduct/:id",
  auth,
  upload.single("image"),   // ✔️ FIX
  editproduct
);

/* DELETE */
router.delete("/deleteproduct/:id", auth, deleteproduct);

module.exports = router;