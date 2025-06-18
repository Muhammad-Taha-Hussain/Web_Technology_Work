import Jw_Products from '../models/Jw_Products.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, sizes, colors } = req.body;
    const imageUrls = req.files.map(file => file.path);

    const newProduct = new Jw_Products({
      name,
      description,
      price,
      stock,
      category,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Jw_Products.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProductsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const products = await Jw_Products.find({ category }); // 'category' should exist in your MongoDB schema
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};
export const getAllMixProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 12;
    console.log('====================================');
    console.log("hello");
    console.log('====================================');
    try {
      const products = await Jw_Products.aggregate([{ $sample: { size: limit } }]); // MongoDB random sample
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch mixed products' });
    }
};


export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Jw_Products.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });

  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};