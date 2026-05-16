import React, { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../components/Navbar"
import AddProduct from "./AddProduct"
import ViewProduct from "./ViewProduct"
import UpdateProfile from "./UpdateProfile"

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard")

  const [data, setData] = useState({
    email: "",
    name: "",
    contact: "",
    address: ""
  })

  useEffect(() => {
    userDashboard()
  }, [])

  const userDashboard = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
          },
          withCredentials: true
        }
      )

      setData(response.data.dashboard)

    } catch (err) {
      console.log("Error fetching dashboard", err)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#FFF0F2]">
      <Navbar setSelectedPage={setSelectedPage} />

      <main className="flex-1 p-8">

        {selectedPage === "dashboard" && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h1 className="text-3xl font-bold text-[#2E2526]">
              Welcome back, {data.name}
            </h1>
          </div>
        )}

        {selectedPage === "addProduct" && (
          <AddProduct />
        )}

        {selectedPage === "viewProduct" && (
          <ViewProduct />
        )}

        {selectedPage === "profile" && (
          <UpdateProfile/>
        )}

      </main>
    </div>
  )
}

export default Dashboard