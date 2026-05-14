let mongo=require("mongoose");
let usermodel=mongo.Schema({
   name:{type:String},
   email:{type:String},
   password:{type:String},
   contact:{type:Number},
   address:{type:String},
});
module.exports=mongo.model('user',usermodel);