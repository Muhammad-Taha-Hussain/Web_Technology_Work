

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';
import Checkout from '../components/Checkout'; // Note: Use Checkout not CheckoutForm
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cart/', { withCredentials: true });
        const items = res.data.cartItems;
        setCartItems(items);

        const total = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
        setTotalAmount(total);

        const paymentRes = await axios.post(
          'http://localhost:5000/api/order/create-payment-intent',
          { amount: total }, // amount in USD (or your currency base unit)
          { withCredentials: true }
        );

        setClientSecret(paymentRes.data.clientSecret);
        setPaymentIntentId(paymentRes.data.paymentIntentId); // Capture the intent ID for order placement
      } catch (error) {
        console.error('Error fetching cart or creating payment intent:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
            <ToastContainer /> 

      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty. 🛒</p>
          <button 
            className="home-button" 
            onClick={() => navigate('/home')}
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.productId.images[0]} alt={item.productId.name} />
              <div>
                <h4>{item.productId.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p>${item.productId.price}</p>
              </div>
            </div>
          ))}
          <h3>Total: ${totalAmount}</h3>

          {clientSecret && (
            <Checkout
              clientSecret={clientSecret}
              paymentIntentId={paymentIntentId}
              cartItems={cartItems}
              totalAmount={totalAmount}
              setCartItems={setCartItems}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
