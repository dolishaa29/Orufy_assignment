import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User, Mail, Phone, MapPin, UserCheck } from "lucide-react";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(import.meta.env.VITE_API_URL + "/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const contactRegex = /^[6-9]\d{9}$/;
    if (user.contact && !contactRegex.test(user.contact)) {
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await axios.post(import.meta.env.VITE_API_URL + "/updateprofile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setSuccess(res.data.message || "Profile Updated Successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error(err);
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full py-6 flex items-center justify-center antialiased font-sans">
      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-2xl p-6 sm:p-8 flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center w-full mb-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-3 hover:scale-105 transition-transform duration-300">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">{user.name || "Admin User"}</h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{user.email || "admin@store.com"}</p>
          </div>
        </div>

        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={updateProfile} className="w-full grid grid-cols-1 gap-5">
          
          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <User size={16} />
              </span>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Contact Number</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <Phone size={16} />
              </span>
              <input
                type="tel"
                name="contact"
                value={user.contact || ""}
                maxLength={10}
                placeholder="9876543210"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setUser({ ...user, contact: value });
                }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Office/Home Address</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <MapPin size={16} />
              </span>
              <input
                type="text"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                placeholder="Street 12, New York"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-indigo-600 hover:opacity-90 text-white py-3.5 rounded-xl text-sm font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70"
            >
              <UserCheck size={16} strokeWidth={2.2} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;