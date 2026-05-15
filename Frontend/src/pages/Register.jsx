import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const nagivate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: "",
  })  
  const [msg, setMsg] = useState("")

  const sendData = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password should be same")
    }
    else {

      let data = await axios.post(
        "http://localhost:7000/register",
        formData
      )

      if (data.data.status) {
        setMsg(data.data.msg)
        console.log("data", data.data.msg);
        alert(data.data.msg)
        nagivate("/login")
      }
      else {
        setMsg(data.data.msg)
        alert(data.data.msg)
      }
    }
  }

  return (
    <>
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

          .register-container{
            width:100%;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
          }

          .register-box{
            width:400px;
            background:white;
            padding:30px;
            border-radius:12px;
            box-shadow:0 4px 15px rgba(0,0,0,0.1);
          }

          .register-box h1{
            text-align:center;
            margin-bottom:20px;
            color:#333;
          }

          .register-box form{
            display:flex;
            flex-direction:column;
            gap:15px;
          }

          .register-box input{
            padding:12px;
            border:1px solid #ccc;
            border-radius:8px;
            outline:none;
            font-size:15px;
            transition:0.3s;
          }

          .register-box input:focus{
            border-color:#4a90e2;
            box-shadow:0 0 5px rgba(74,144,226,0.5);
          }

          .register-box button{
            padding:12px;
            border:none;
            border-radius:8px;
            background:#4a90e2;
            color:white;
            font-size:16px;
            cursor:pointer;
            transition:0.3s;
          }

          .register-box button:hover{
            background:#357abd;
          }

          .register-box p{
            margin-top:15px;
            text-align:center;
            color:#555;
          }

          .register-box span{
            color:#4a90e2;
            cursor:pointer;
            font-weight:bold;
          }

          .register-box span:hover{
            text-decoration:underline;
          }
        `}
      </style>

      <div className='register-container'>

        <div className='register-box'>

          <h1>Register</h1>
          <h1>{msg}</h1>
          <form onSubmit={sendData}>

            <input
              type="text"
              placeholder='Name'
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder='Email'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder='Password'
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder='Confirm Password'
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder='Contact'
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder='Address'
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />

            <button type='submit'>Register</button>

          </form>

          <p>
            Already have an account?
            <span onClick={() => nagivate("/")}>
              {" "}Login
            </span>
          </p>

        </div>

      </div>
    </>
  )
}

export default Register