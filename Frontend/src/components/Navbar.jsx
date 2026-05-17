import React from "react";
import { PlusCircle, Package, User, LogOut , Compass } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ selectedPage, setSelectedPage }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "viewProduct", label: "View Product", icon: Package },
    { id: "addProduct", label: "Add Product", icon: PlusCircle },
    { id: "profile", label: "Profile", icon: User },
    {id:"Explore" ,label:"Explore" ,icon:Compass}
  ];

  const handleSignOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    Cookies.remove("token");
    navigate("/"); 
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between antialiased font-sans sticky top-0 z-50 gap-4">
    
      <div className="text-xl font-bold bg-gradient-to-r align-middle from-indigo-600 to-indigo-800 bg-clip-text text-transparent tracking-tight shrink-0">
        Products
      </div>
      <div className="flex items-center justify-center flex-1 gap-4 max-w-xl mx-auto">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = selectedPage === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedPage(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                isActive 
                  ? "bg-indigo-50/80 text-indigo-600" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? "text-indigo-600" : "text-slate-400"} />
              <span>{label}</span>
              
              {isActive && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="shrink-0">
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-50/60 hover:bg-rose-50 border border-rose-100/50 hover:border-rose-200 text-rose-600 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.98]"
        >
          <LogOut size={14} strokeWidth={2.2} />
          Sign Out
        </button>
      </div>

    </nav>
  );
};

export default Navbar;