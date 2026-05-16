import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    ProductName: "",
    ProductType: "",
    QuantityStock: "",
    MRP: "",
    SellingPrice: "",
    BrandName: "",
    Exchange: "",
    Type: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const formData = new FormData();

      formData.append("ProductName", form.ProductName);
      formData.append("ProductType", form.ProductType);
      formData.append("QuantityStock", form.QuantityStock);
      formData.append("MRP", form.MRP);
      formData.append("SellingPrice", form.SellingPrice);
      formData.append("BrandName", form.BrandName);
      formData.append("Exchange", form.Exchange);
      formData.append("Type", form.Type);

      formData.append("Images", image);

      const res = await axios.post(
        "http://localhost:7000/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(res.data);

      alert("Product Added Successfully");

      setForm({
        ProductName: "",
        ProductType: "",
        QuantityStock: "",
        MRP: "",
        SellingPrice: "",
        BrandName: "",
        Exchange: "",
        Type: "",
      });

      setImage(null);

    } catch (error) {
      console.log(error.message);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4F6] flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2E2526]">
            Add Product
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="ProductName"
              value={form.ProductName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Type
            </label>

            <input
              type="text"
              name="ProductType"
              value={form.ProductType}
              onChange={handleChange}
              placeholder="Enter product type"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Quantity Stock
            </label>

            <input
              type="number"
              name="QuantityStock"
              value={form.QuantityStock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              MRP
            </label>

            <input
              type="number"
              name="MRP"
              value={form.MRP}
              onChange={handleChange}
              placeholder="Enter MRP"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Selling Price
            </label>

            <input
              type="number"
              name="SellingPrice"
              value={form.SellingPrice}
              onChange={handleChange}
              placeholder="Enter selling price"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Brand Name
            </label>

            <input
              type="text"
              name="BrandName"
              value={form.BrandName}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Exchange Available
            </label>

            <select
              name="Exchange"
              value={form.Exchange}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            >
              <option value="">
                Select Exchange Option
              </option>

              <option value="yes">
                Yes
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Status
            </label>

            <select
              name="Type"
              value={form.Type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
              required
            >
              <option value="">
                Select Product Status
              </option>

              <option value="published">
                Published
              </option>

              <option value="unpublished">
                Unpublished
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Image 
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-dashed border-gray-400 rounded-xl p-4 bg-gray-50"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2E2526] hover:bg-black text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;