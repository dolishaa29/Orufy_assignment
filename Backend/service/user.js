let rec=require("../model/user");
let jwt=require("jsonwebtoken");
let bct=require("bcrypt");

exports.register=async(req,res)=>{
    try{
        console.log("req.body",req.body);
        let name=req.body.name;
        let email=req.body.email;
        let password=req.body.password;
        let contact=req.body.contact;
        let address=req.body.address;
      
        let user=await rec.findOne({email:email});
        console.log("user",user);
        if(user)
        {
            return res.status(400).json({msg: "User already exists"});
        }
        else{
            let hash=await bct.hash(password,10);
            let user=new rec({name:name,email:email,password:hash,contact:contact,address:address});
            await user.save();
            res.status(201).json({msg: "User registered successfully",data:user});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error",
            message:err.message,
        });
    }
}

exports.login=async(req,res)=>
{
    try{
        let email=req.body.email;
        let password=req.body.password;
        let user=await rec.findOne({email:email});
        if(!user)
        {
            return res.status(400).json({msg: "user does not exist"});
        }
        let pass=await bct.compare(password,user.password);
        if(pass)
        {
           let token=jwt.sign({token:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
           res.cookie("token",token,{
            httpOnly:true,
            secure: true,
            sameSite: "none",
        });
        console.log("token",token);
        res.status(200).json({msg: "Login successful",token:token});
        }
        else
        {
            return res.status(400).json({msg: "Invalid password"});
        }
    }
    catch(err)

    {
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error",
            message:err.message,
        });
    }

}

exports.dashboard=async(req,res)=>
{
    const user =  req.user;
    return res.status(200).json({success: true,msg: "user dashboard fetched successfully",dashboard:
    {
     email:user.email,name:user.name,contact:user.contact,address:user.address
    },
    });
}