const { register, login } = require("../service/user")

exports.register=async(req,res)=>
{
  await register(req,res);
}
exports.login=async(req,res)=>
{
  await login(req,res);
}