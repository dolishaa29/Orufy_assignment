let rec=require("../model/user");
let jwt=require("jsonwebtoken");
let bct=require("bcrypt");

exports.register=async(req,res)=>{
    try{
        let name=req.body.name;
        let email=req.body.email;
        let password=req.body.password;
        let contact=req.body.contact;
        let address=req.body.address;

        let user=await rec.findOne({email:email});
        if(user)
        {
            return res.status(400).json({msg: "User already exists"});
        }
        else{
            let hash=await bct.hash(password,10);
            let user=new rec({name:name,email:email,password:hash,contact:contact,address:address});
            await user.save();
            res.status(201).json({msg: "User registered successfully"});
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
        if(!pass)
        {
            return res.status(400).json({msg: "Invalid credentials"});
        }
        return res.status(200).json({
            msg: "Login successful"
        });

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