let mongoose=require("mongoose");
require("dotenv").config();

const mongoURI=process.env.MONGO_URI;
mongoose.connect(mongoURI);
const productx=mongoose.connection;
productx.on("connected",()=>{
    console.log("MongoDB connected successfully");
});
productx.on("error",(err)=>{
    console.log("MongoDB connection error:",err);
});
productx.on("disconnected",()=>{
    console.log("MongoDB disconnected");
});

module.exports=productx;