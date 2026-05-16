const rec = require("../model/product");
const cloudinary = require("../config/cloudinary");


exports.addproduct = async (req, res) => {
  try {
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
      console.log(imageUrl);

    const product = new rec({
      ProductName:ProductName,
      ProductType:ProductType,
      QuantityStock:QuantityStock,
      MRP:MRP,
      SellingPrice:SellingPrice,
      BrandName:BrandName,
      Exchange:Exchange,
      Type:Type,
      Images: imageUrl,
    });
    console.log(product)
    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewproduct=async(req,res)=>
{
  
}
exports.editproduct=async(req,res)=>
{

}
exports.deleteproduct=async(req,res)=>
{
    
}