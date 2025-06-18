// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Users', required: true },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Products', required: true },
      quantity: { type: Number, required: true }
    }
  ],

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },

  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },

  paymentMethod: {
    type: String,
    enum: ['COD', 'card', 'jazzcash'],
    default: 'card'
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Jw_orders', OrderSchema);
export default Order;
