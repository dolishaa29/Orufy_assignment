import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import UpdateProfile from "./UpdateProfile";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("viewProduct");
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    userDashboard();
  }, []);

  const userDashboard = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.dashboard) {
        setData(response.data.dashboard);
      }
    } catch (err) {
      console.error("Error fetching dashboard", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] antialiased font-sans">
      
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

      <main className="flex-1 overflow-y-auto p-6">
        {selectedPage === "viewProduct" && <ViewProduct />}
        {selectedPage === "addProduct" && <AddProduct />}
        {selectedPage === "profile" && <UpdateProfile />}
      </main>
      
    </div>
  );
};

export default Dashboard;