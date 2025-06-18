import Jw_cart_items from "../models/Jw_cart_items.js";
import Jw_Products from "../models/Jw_Products.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const userId = req.userId; // from JWT middleware or session

    // Check if product exists
    const product = await Jw_Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if item already in cart (same size & color)
    const existingItem = await Jw_cart_items.findOne({ 
      userId, 
      productId, 
      size, 
      color 
    });

    if (existingItem) {
      // Update quantity if already in cart
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem: existingItem });
    }

    // Else, add new item to cart
    const newItem = new Jw_cart_items({ userId, productId, quantity, size, color });
    await newItem.save();
    res.status(201).json({ message: "Item added to cart", cartItem: newItem });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all cart items for user
export const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await Jw_cart_items.find({ userId }).populate('productId');
    res.status(200).json({ cartItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update cart item (quantity/size/color)
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity, size, color } = req.body;
    const userId = req.userId;

    const cartItem = await Jw_cart_items.findOne({ _id: itemId, userId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    if (quantity !== undefined) cartItem.quantity = quantity;
    if (size) cartItem.size = size;
    if (color) cartItem.color = color;

    await cartItem.save();
    res.status(200).json({ message: "Cart item updated", cartItem });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a single cart item
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.userId;

    const cartItem = await Jw_cart_items.findOneAndDelete({ _id: itemId, userId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Item removed from cart" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear all cart items for user
export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    await Jw_cart_items.deleteMany({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
