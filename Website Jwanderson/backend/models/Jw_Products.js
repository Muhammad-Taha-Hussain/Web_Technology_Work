// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, enum: ['men', 'women', 'kids'], required: true },
  images: [String], // array of image URLs
  sizes: [String],  // ["S", "M", "L", "XL"]
  colors: [String], // ["red", "blue"]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Jw_Products = mongoose.model("Jw_Products", ProductSchema);
export default Jw_Products;

