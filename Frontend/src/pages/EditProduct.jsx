import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, PackageCheck, ArrowLeft, Image as ImageIcon } from "lucide-react";

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
        `${import.meta.env.VITE_API_URL}/singleproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.product) {
        setProduct(response.data.product);

        if (response.data.product.Images) {
          const dbImg = Array.isArray(response.data.product.Images)
            ? response.data.product.Images[0]
            : response.data.product.Images;

          setPreview(dbImg);
        }
      }

    } catch (error) {
      console.log("Error fetching product:", error.response?.data || error.message);
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
        `${import.meta.env.VITE_API_URL}/editproduct/${id}`,
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
      console.log(error.response?.data );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-6 lg:p-10 antialiased font-sans">
      
      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-2xl p-6 sm:p-10">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Edit Product</h2>
          <p className="text-gray-500 mt-1 text-sm">Update the details or images of your existing product below.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              Product Image Preview
            </label>
            <div className="border border-slate-200 rounded-2xl bg-white/50 p-6 flex justify-center items-center shadow-sm">
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-xl shadow-md border border-slate-100"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-400 p-6">
                  <ImageIcon size={32} strokeWidth={1.5} className="mb-1" />
                  <p className="text-xs font-medium">No Image Available</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={product.ProductName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Type</label>
            <input
              type="text"
              name="ProductType"
              value={product.ProductType}
              onChange={handleChange}
              placeholder="Enter Product Type"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Quantity Stock</label>
            <input
              type="number"
              name="QuantityStock"
              value={product.QuantityStock}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Brand Name</label>
            <input
              type="text"
              name="BrandName"
              value={product.BrandName}
              onChange={handleChange}
              placeholder="Brand Name"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">MRP (Original Price)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">₹</span>
              <input
                type="number"
                name="MRP"
                value={product.MRP}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-8 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Selling Price</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">₹</span>
              <input
                type="number"
                name="SellingPrice"
                value={product.SellingPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-8 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Exchange Available</label>
            <select
              name="Exchange"
              value={product.Exchange}
              onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-600 appearance-none shadow-sm"
            >
              <option value="">Select Exchange</option>
              <option value="yes">Yes, Exchange Available</option>
              <option value="no">No, Not Available</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Status</label>
            <select
              name="Type"
              value={product.Type}
              onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-600 appearance-none shadow-sm"
            >
              <option value="">Select Status</option>
              <option value="published">Published (Live)</option>
              <option value="unpublished">Unpublished (Draft)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Change Product Image</label>
            <label className="group relative flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl cursor-pointer bg-white/50 hover:bg-white transition-all p-4 text-center shadow-sm">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:text-indigo-600 transition-colors">
                  <Upload size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                {image ? (
                  <p className="text-xs font-semibold text-indigo-600 truncate max-w-xs">{image.name}</p>
                ) : (
                  <>
                    <p className="text-xs font-medium text-slate-700">Click to replace current image</p>
                    <p className="text-[10px] text-slate-400 font-medium">Leave empty to keep the current image</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50/80 text-slate-600 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.99]"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:opacity-90 text-white py-3.5 rounded-xl text-sm font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
            >
              <PackageCheck size={16} />
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;