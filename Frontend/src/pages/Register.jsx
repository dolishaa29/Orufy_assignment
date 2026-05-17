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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    const contactRegex = /^[6-9]\d{9}$/
    if (!contactRegex.test(formData.contact)) {
      setError("Please enter a valid 10-digit mobile number")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/register",
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
    }, 5000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-4">
      <div className="w-full max-w-6xl h-[660px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        <div className="hidden md:block w-3/5 h-full relative overflow-hidden group">
          <img
            src={img}
            alt="register visual"
            className="w-full h-full object-cover object-center transition-transform duration-[1000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-pink-300/20" />
          <div className="absolute bottom-8 left-8 z-10">
            <Link
              to="/explore"
              className="relative inline-flex items-center gap-3 px-6 py-3 overflow-hidden rounded-xl bg-white/10 text-white font-medium text-sm backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105 active:scale-95 group/btn"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
              <span className="absolute -inset-1 rounded-xl bg-white/20 blur-sm opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-ping duration-500" />
              <span className="relative z-10 tracking-wide">Explore More</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2 ease-out"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-2/5 bg-white flex items-center justify-center p-8 md:p-10 overflow-y-auto">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-gray-800">Sign Up</h2>
              <p className="text-gray-500 mt-2">Create your account to continue</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={sendData} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />

              <input
                type="tel"
                placeholder="Contact (10-digit)"
                value={formData.contact}
                maxLength={10} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => {
                  
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, contact: value });
                }}
                required
              />

              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-70"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 font-semibold hover:text-pink-500 transition">
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