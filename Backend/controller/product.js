const { addproduct, viewproduct, editproduct, deleteproduct } = require("../service/product")

exports.addproduct=async(req,res)=>
{
    await addproduct(req,res);
}

exports.viewproduct=async(req,res)=>
{
    await viewproduct(req,res);
}

exports.editproduct=async(req,res)=>
{
    await editproduct(req,res);
}

exports.deleteproduct=async(req,res)=>
{
    await deleteproduct(req,res);
}