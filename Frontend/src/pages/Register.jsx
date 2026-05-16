import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [img, setImg] = useState("/pic1.jpg")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: ""
  })

  const sendData = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(
        "http://localhost:7000/register",
        formData
      )

      if (res.data.status) {
        navigate("/")
      } else {
        setError(res.data.msg || "Registration failed")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg", "/pic5.jpg"]

    let i = 0

    const interval = setInterval(() => {
      i = (i + 1) % images.length
      setImg(images[i])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-4">

      <div className="w-full max-w-6xl h-[640px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">

        {/* IMAGE SIDE */}
        <div className="hidden md:block w-3/5 h-full relative overflow-hidden">

          <img
            src={img}
            alt="register"
            className="w-full h-full object-cover object-center transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 via-pink-500/40 to-indigo-600/50" />

        </div>

        {/* FORM SIDE */}
        <div className="w-full md:w-2/5 bg-white flex items-center justify-center p-10 md:p-14">

          <div className="w-full max-w-sm">

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800">
                Sign Up
              </h2>

              <p className="text-gray-500 mt-2">
                Create your account to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                {error}
              </div>
            )}

            <form onSubmit={sendData} className="space-y-5">

              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Contact"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:opacity-90 transition-all duration-300"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 font-semibold hover:text-pink-500">
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Register