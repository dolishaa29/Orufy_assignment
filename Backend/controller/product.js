const { addproduct, viewproduct, editproduct, deleteproduct, explore, singleproduct, singleproductexplore } = require("../service/product")

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

exports.explore=async(req,res)=>
{
    await explore(req,res);
}

exports.singleproductexplore=async(req,res)=>
{
    await singleproductexplore(req,res);
}