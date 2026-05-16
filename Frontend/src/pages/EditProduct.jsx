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
    setImage(e.target.files[0]);
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

      navigate("/view-product");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="ProductName"
          placeholder="Product Name"
          value={product.ProductName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="ProductType"
          placeholder="Product Type"
          value={product.ProductType}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="QuantityStock"
          placeholder="Quantity"
          value={product.QuantityStock}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="MRP"
          placeholder="MRP"
          value={product.MRP}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="SellingPrice"
          placeholder="Selling Price"
          value={product.SellingPrice}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="BrandName"
          placeholder="Brand Name"
          value={product.BrandName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="Exchange"
          placeholder="Exchange"
          value={product.Exchange}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="Type"
          placeholder="Type"
          value={product.Type}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="file"
          onChange={handleImage}
        />

        <br /><br />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;