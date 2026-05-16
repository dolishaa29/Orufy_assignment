import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Upload, PackagePlus } from "lucide-react";

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
    setForm({ ...form, [e.target.name]: e.target.value });
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

      await axios.post(import.meta.env.VITE_API_URL + "/addproduct", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

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
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 lg:p-10 antialiased font-sans">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={form.ProductName}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Type</label>
            <input
              type="text"
              name="ProductType"
              value={form.ProductType}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Quantity Stock</label>
            <input
              type="number"
              name="QuantityStock"
              value={form.QuantityStock}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Brand Name</label>
            <input
              type="text"
              name="BrandName"
              value={form.BrandName}
              onChange={handleChange}
              placeholder="e.g. Sony"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">MRP (Original Price)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">₹</span>
              <input
                type="number"
                name="MRP"
                value={form.MRP}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-8 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
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
                value={form.SellingPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 pl-8 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Exchange Available</label>
            <select
              name="Exchange"
              value={form.Exchange}
              onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-600 appearance-none"
              required
            >
              <option value="" className="text-slate-400">Select option</option>
              <option value="yes">Yes, Exchange Available</option>
              <option value="no">No, Not Available</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Status</label>
            <select
              name="Type"
              value={form.Type}
              onChange={handleChange}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 text-slate-600 appearance-none"
              required
            >
              <option value="" className="text-slate-400">Select status</option>
              <option value="published">Published (Live)</option>
              <option value="unpublished">Unpublished (Draft)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Product Image</label>
            <label className="group relative flex flex-col items-center justify-center w-full min-h-[140px] border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-50/30 hover:bg-slate-50/80 transition-all p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
                required={!image}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:text-indigo-600 transition-colors">
                  <Upload size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                {image ? (
                  <p className="text-sm font-semibold text-indigo-600 truncate max-w-xs">{image.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">Click to upload product image</p>
                    <p className="text-[11px] text-slate-400 font-medium">PNG, JPG or WEBP up to 5MB</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99]"
            >
              <PackagePlus size={16} strokeWidth={2.2} />
              Publish Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;