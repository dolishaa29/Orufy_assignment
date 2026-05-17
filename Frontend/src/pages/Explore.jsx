import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Card2 from "../components/Card2";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Explore Products</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => {
            const seller = users.find((user) => user._id === item.User);
            const contactInfo = seller ? seller.contact : "Not Available";

            return (
              <Card2 key={item._id} item={item} sellerContact={contactInfo} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;