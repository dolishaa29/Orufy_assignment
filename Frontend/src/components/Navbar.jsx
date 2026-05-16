import React from "react"

const Navbar = ({ setSelectedPage }) => {
  return (
    <nav className="w-72 min-h-screen bg-white border-r border-pink-100 shadow-sm flex flex-col p-6">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2E2526]">
          Product Panel
        </h1>

        <p className="text-sm text-[#8C7A7C] mt-2">
          Manage your products
        </p>
      </div>

      <div className="flex flex-col gap-3">

        <button
          onClick={() => setSelectedPage("dashboard")}
          className="text-left px-5 py-3 rounded-xl hover:bg-pink-100 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => setSelectedPage("addProduct")}
          className="text-left px-5 py-3 rounded-xl hover:bg-pink-100 transition"
        >
          Add Product
        </button>

        <button
          onClick={() => setSelectedPage("viewProduct")}
          className="text-left px-5 py-3 rounded-xl hover:bg-pink-100 transition"
        >
          View Product
        </button>

        <button
          onClick={() => setSelectedPage("profile")}
          className="text-left px-5 py-3 rounded-xl hover:bg-pink-100 transition"
        >
          Profile
        </button>

      </div>
    </nav>
  )
}

export default Navbar