import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Card2 from "../components/Card2"; 

const Explore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/explore",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const publishedOnly = response.data.products.filter(p => p.Type === "published");
      setProducts(publishedOnly);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Explore Products</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <Card2 key={item._id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Explore;