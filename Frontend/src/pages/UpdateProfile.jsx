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

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get("http://localhost:7000/profile", {
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
    try {
      const token = Cookies.get("token");
      const res = await axios.post("http://localhost:7000/updateprofile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Profile Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10 antialiased font-sans">

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] p-6 sm:p-10">
        
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">{user.name || "Admin User"}</h3>
            <p className="text-xs text-slate-400 font-medium">{user.email || "admin@store.com"}</p>
          </div>
        </div>

        <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
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
                type="text"
                name="contact"
                value={user.contact || ""}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-11 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99]"
            >
              <UserCheck size={16} strokeWidth={2.2} />
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;