import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Users', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Products', required: true },
    quantity: { type: Number, default: 1 },
    size: String,
    color: String,
    addedAt: { type: Date, default: Date.now }
  });

  const CartItem = mongoose.model("Jw_cart_items", CartItemSchema);
export default CartItem;
