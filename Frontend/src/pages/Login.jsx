import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const sendData = async (e) => {
    e.preventDefault()
    let data = await axios.post(
      "http://localhost:7000/login",
      formData
    )
    if (data.data.status) {
      alert(data.data.msg)
      navigate("/dashboard")
    }
    else {
      alert(data.data.msg)
    }
  }

  return (
    <div>
      <style>
        {`
          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
          }
          body{
            font-family: Arial, Helvetica, sans-serif;
            background:#f4f7fb;
          }

          .login-container{
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
          }
          .login-box{
            width:400px;
            padding:40px;
            background:#fff;
            box-shadow:0 15px 25px rgba(0,0,0,0.5);
            border-radius:10px;
          }
          .login-box h1{
            text-align:center;
            margin-bottom:30px;
          }
          .login-box input{
            width:100%;
            padding:10px;
            margin-bottom:20px;
            border:1px solid #ccc;
            border-radius:5px;
          }
          .login-box button{
            width:100%;
            padding:10px;
            background:#007bff;
            color:#fff;
            border:none;
            border-radius:5px;
            cursor:pointer;
          }
          .login-box button:hover{
            background:#0056b3;
          }
        `}
      </style>
      <div className='login-container'>
        <div className='login-box'>
          <h1>Login</h1>  
          <form onSubmit={sendData}>
            <input
              type="email"
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type='submit'>Login</button>
          </form>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>

      
    </div>
  )
}

export default Login
