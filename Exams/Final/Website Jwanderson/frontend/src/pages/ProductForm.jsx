import React, { useState } from "react";
import axios from "axios";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "men",
    sizes: "",
    colors: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("category", formData.category);
      productData.append("sizes", JSON.stringify(formData.sizes.split(',').map(item => item.trim())));
      productData.append("colors", JSON.stringify(formData.colors.split(',').map(item => item.trim())));

      // Append all images
      for (let i = 0; i < formData.images.length; i++) {
        productData.append("images", formData.images[i]);
      }

      console.log("📦 Sending product data:", productData);

      const res = await axios.post("http://localhost:5000/api/products/create", productData);

      alert("✅ Product Created Successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "men",
        sizes: "",
        colors: "",
        images: [],
      });

      navigate("/home"); // Optional redirect after success
    } catch (err) {
      console.error("🚨 Product creation failed:", err);
      alert("❌ Error creating product!");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      <input
        type="text"
        name="sizes"
        placeholder="Sizes (comma separated, e.g. S,M,L)"
        value={formData.sizes}
        onChange={handleChange}
      />

      <input
        type="text"
        name="colors"
        placeholder="Colors (comma separated, e.g. red,blue)"
        value={formData.colors}
        onChange={handleChange}
      />

      <input
        type="file"
        name="images"
        multiple
        onChange={handleChange}
      />

      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
