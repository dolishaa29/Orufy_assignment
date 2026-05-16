import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ProductName: "",
    ProductType: "",
    QuantityStock: "",
    MRP: "",
    SellingPrice: "",
    BrandName: "",
    Exchange: "",
    Type: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get(
        `http://localhost:7000/singleproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct(response.data.product);

      if (response.data.product.Images) {
        const dbImg = Array.isArray(response.data.product.Images)
          ? response.data.product.Images[0]
          : response.data.product.Images;

        setPreview(dbImg);
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const formData = new FormData();

      formData.append("ProductName", product.ProductName);
      formData.append("ProductType", product.ProductType);
      formData.append("QuantityStock", product.QuantityStock);
      formData.append("MRP", product.MRP);
      formData.append("SellingPrice", product.SellingPrice);
      formData.append("BrandName", product.BrandName);
      formData.append("Exchange", product.Exchange);
      formData.append("Type", product.Type);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:7000/editproduct/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      navigate("/ViewProduct");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4F6] p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div className="md:col-span-2">

            <label className="block mb-3 text-sm font-semibold text-gray-700">
              Product Image Preview
            </label>

            <div className="border-2 border-dashed border-pink-200 rounded-3xl bg-pink-50 p-6 flex justify-center items-center">

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-64 h-64 object-cover rounded-2xl shadow-md"
                />
              ) : (
                <p className="text-gray-400">
                  No Image Available
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="ProductName"
              value={product.ProductName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
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
              value={product.ProductType}
              onChange={handleChange}
              placeholder="Enter Product Type"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

     
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Quantity Stock
            </label>

            <input
              type="number"
              name="QuantityStock"
              value={product.QuantityStock}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
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
              value={product.MRP}
              onChange={handleChange}
              placeholder="Enter MRP"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
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
              value={product.SellingPrice}
              onChange={handleChange}
              placeholder="Enter Selling Price"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
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
              value={product.BrandName}
              onChange={handleChange}
              placeholder="Enter Brand Name"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Exchange Available
            </label>

            <select
              name="Exchange"
              value={product.Exchange}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">
                Select Exchange
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
              value={product.Type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">
                Select Status
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
              Change Product Image
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full text-gray-600"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-4 rounded-2xl font-semibold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-[#2E2526] hover:bg-black text-white py-4 rounded-2xl font-semibold shadow-lg transition"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;