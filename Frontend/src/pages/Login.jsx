import React, { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")

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

        navigate("/dashboard")
      } else {
        setError(response.data.message || "Invalid Credentials")
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed! Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-4">

      <div className="w-full max-w-6xl h-[620px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">

        <div className="hidden md:block w-3/5 h-full relative overflow-hidden">

          <img
            src="/pic5.jpg"
            alt="login visual"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-pink-300" />

        </div>

        <div className="w-full md:w-2/5 bg-white flex items-center justify-center p-8 md:p-12">

          <div className="w-full max-w-sm">

            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-800">
                Sign In
              </h2>

              <p className="text-gray-500 mt-2">
                Please login to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <p className="text-sm text-gray-500 mt-8 text-center">
              Don't have an account?
              <Link
                to="/register"
                className="text-purple-600 font-semibold hover:text-pink-500 transition"
              >
                Sign up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login