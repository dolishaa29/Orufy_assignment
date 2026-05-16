import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
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
    } 
    catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
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

  return (
    <div>
      <h1>All Products</h1>
      {products.length > 0 ? (
        products.map((item) => (
          <div key={item._id}>
            <img
              src={item.Images}
              alt={item.ProductName}
              width="150"
            />
            <h2>{item.ProductName}</h2>
            <p>{item.ProductType}</p>
            <p>{item.BrandName}</p>
            <p>{item.QuantityStock}</p>
            <p>₹{item.MRP}</p>
            <p>₹{item.SellingPrice}</p>
            <button
              onClick={() => navigate(`/EditProduct/${item._id}`)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteProduct(item._id)}
            >
              Delete
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
};

export default ViewProduct;