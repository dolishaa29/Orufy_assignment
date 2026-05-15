let mongo=require("mongoose");
let productmodel=mongo.Schema({
    ProductName:{type:String},
    ProductType:{type:String},
    QuantityStock:{type:Number},
    MRP:{type:Number},
    SellingPrice:{type:Number},
    BrandName:{type:String},
    Images:{type:String},
    Exchange:{type:String , enum:['yes','no']},
    Type:{type:String , enum:['published','unpublished']},
})

module.exports=mongo.model('product',productmodel);