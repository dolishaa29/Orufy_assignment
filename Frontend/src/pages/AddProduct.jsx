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
    Exchange: "no",
    Type: "published",
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

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("Images", image);

      const res = await axios.post(
        "http://localhost:7000/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⭐ important
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      alert("Product Added Successfully");
    } catch (error) {
      console.log(error.message);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ProductName"
          placeholder="Product Name"
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="ProductType"
          placeholder="Product Type"
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="QuantityStock"
          placeholder="Quantity Stock"
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="MRP"
          placeholder="MRP"
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="SellingPrice"
          placeholder="Selling Price"
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="BrandName"
          placeholder="Brand Name"
          onChange={handleChange}
        />
        <br />

        <select name="Exchange" onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        <br />

        <select name="Type" onChange={handleChange}>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;