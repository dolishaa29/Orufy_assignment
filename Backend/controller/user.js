const { register, login, alluser } = require("../service/user")

exports.register=async(req,res)=>
{
  await register(req,res);
}
exports.login=async(req,res)=>
{
  await login(req,res);
}
exports.alluser=async(req,res)=>
{
  await alluser(req,res);
}