const rec = require("../model/product");
const cloudinary = require("../config/cloudinary");

exports.addproduct = async (req, res) => {
  try {
    const user = req.user._id;
    let ProductName=req.body.ProductName;
    let ProductType=req.body.ProductType;
    let QuantityStock=req.body.QuantityStock;
    let MRP=req.body.MRP;
    let SellingPrice=req.body.SellingPrice;
    let BrandName=req.body.BrandName;
    let Exchange=req.body.Exchange;
    let Type=req.body.Type;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = await rec.create({
      ProductName:ProductName,
      ProductType:ProductType,
      QuantityStock:QuantityStock,
      MRP:MRP,
      SellingPrice:SellingPrice,
      BrandName:BrandName,
      Exchange:Exchange,
      Type:Type,
      Images: imageUrl,
      User: user,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.viewproduct = async (req, res) => {
  try {
    const user = req.user._id;
    const products = await rec.find({ User: user });
    return res.status(200).json({
      success: true,
      products,
    });
  } 
  catch (error) 
  {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.editproduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let ProductName=req.body.ProductName;
    let ProductType=req.body.ProductType;
    let QuantityStock=req.body.QuantityStock;
    let MRP=req.body.MRP;
    let SellingPrice=req.body.SellingPrice;
    let BrandName=req.body.BrandName;
    let Exchange=req.body.Exchange;
    let Type=req.body.Type;

    const product = await rec.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let imageUrl = product.Images;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }


    const updatedProduct = await rec.findByIdAndUpdate(
      productId,
      {
        ProductName,
        ProductType,
        QuantityStock,
        MRP,
        SellingPrice,
        BrandName,
        Exchange,
        Type,
        Images: imageUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await rec.findById(productId);

    if (!product) 
    {
      return res.status(404).json({success: false,message: "Product not found",});
    }

    await rec.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } 
  catch (error) 
  {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};