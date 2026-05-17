import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Card2 from "../components/Card2";
import { Search } from "lucide-react";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProductsData();
    getUsersData();
  }, []);

  const getProductsData = async () => {
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
      const publishedOnly = response.data.products.filter(
        (p) => p.Type === "published"
      );
      setProducts(publishedOnly);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsersData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/alluser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((item) => {
    if (!searchQuery) return true; 

    const pName = item.ProductName ? item.ProductName.toLowerCase() : "";
    const bName = item.BrandName ? item.BrandName.toLowerCase() : "";
    const query = searchQuery.toLowerCase();

    return pName.includes(query) || bName.includes(query);
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-6 lg:p-10 antialiased font-sans">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative flex items-center bg-white/70 backdrop-blur-md border border-white/80 shadow-md rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-400/50 focus-within:border-purple-400 transition-all duration-300">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search by product name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium text-base"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => {
              const seller = users.find((user) => user._id === item.User);
              const contactInfo = seller ? seller.contact : "Not Available";

              return (
                <div key={item._id} className="transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-2xl">
                  <Card2 item={item} sellerContact={contactInfo} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
            <p className="text-gray-500 font-semibold text-lg">
              {searchQuery ? "No matching products found." : "No published products available right now."}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {searchQuery ? "Try searching for another product or brand!" : "Please check back later or add your own product!"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Explore;