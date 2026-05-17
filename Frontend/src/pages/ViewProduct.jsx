import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"; 

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/viewproduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/deleteproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditProduct/${id}`);
  };

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "published") return product.Type === "published";
    if (activeFilter === "unpublished") return product.Type === "unpublished";
    return true; 
  });

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-6 flex border-b border-slate-200">
          {[
            { id: "all", label: "All", count: products.length },
            { id: "published", label: "Published", count: products.filter(p => p.Type === "published").length },
            { id: "unpublished", label: "Unpublished", count: products.filter(p => p.Type === "unpublished").length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`relative pb-3 px-4 text-sm font-medium transition-all ${
                activeFilter === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
              <span className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
                activeFilter === tab.id ? "bg-indigo-100 text-indigo-700" : "bg-slate-200/50 text-slate-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((item) => (
              <Card 
                key={item._id} 
                item={item} 
                onEdit={handleEdit} 
                onDelete={deleteProduct} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-transparent p-12 text-center">
            <p className="text-base font-medium text-slate-600">No Products Found</p>
            <p className="text-sm text-slate-400 mt-1">
              There are no items matching the "{activeFilter}" filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewProduct;