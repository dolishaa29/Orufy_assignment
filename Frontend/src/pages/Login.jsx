import React, { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const sendData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, {
          expires: 1
        })
        alert("Login Successful")
        navigate("/dashboard")
      } else {
        alert(response.data.message || "Invalid Credentials")
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response ? err.response.data : err.message
      )
      alert(
        err.response?.data?.message ||
        "Login Failed! Please try again."
      )
    } finally {
      setLoading(false)
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
            font-family:Arial, Helvetica, sans-serif;
            background:#f4f7fb;
          }

          .login-container{
            width:100%;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
          }

          .login-box{
            width:400px;
            background:white;
            padding:40px;
            border-radius:10px;
            box-shadow:0 10px 25px rgba(0,0,0,0.1);
          }

          .login-box h1{
            text-align:center;
            margin-bottom:25px;
            color:#333;
          }

          .login-box form{
            display:flex;
            flex-direction:column;
          }

          .login-box input{
            width:100%;
            padding:12px;
            margin-bottom:20px;
            border:1px solid #ccc;
            border-radius:5px;
            outline:none;
            font-size:15px;
          }

          .login-box input:focus{
            border-color:#007bff;
          }

          .login-box button{
            width:100%;
            padding:12px;
            background:#007bff;
            color:white;
            border:none;
            border-radius:5px;
            cursor:pointer;
            font-size:16px;
            transition:0.3s;
          }

          .login-box button:hover{
            background:#0056b3;
          }

          .login-box button:disabled{
            background:#999;
            cursor:not-allowed;
          }

          .login-box p{
            margin-top:20px;
            text-align:center;
            color:#555;
          }

          .login-box a{
            color:#007bff;
            text-decoration:none;
            font-weight:bold;
          }

          .login-box a:hover{
            text-decoration:underline;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={sendData}>
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
              required
            />
            <button
              type="submit"
              disabled={loading}
            >
              {
                loading
                  ? "Loading..."
                  : "Login"
              }
            </button>
          </form>
          <p>
            Don't have an account?
            <Link to="/register">
              {" "}Register
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login