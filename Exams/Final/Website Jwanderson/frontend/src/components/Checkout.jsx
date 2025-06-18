import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51PsQRY1om7WfioWhk7gin7GHAYvG3hv2CNVvKJIinGnX2XeeRp9DOedjXqvOAihgBrW3LFGL96omh2LxirqUDSWN0023m4W56j"
);

const CheckoutForm = ({
  cartItems,
  totalAmount,
  paymentIntentId,
  setCartItems,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    // Confirm Payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Optional, no redirection needed here
      },
      redirect: "if_required", // Stay on page unless required
    });

    if (error) {
      console.error("Payment failed:", error.message);
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful, now place the order
      try {
        console.log("====================================");
        console.log("Placing order with paymentIntentId:", paymentIntent.id);
        console.log("====================================");
        const res = await axios.post(
          "http://localhost:5000/api/order/place",
          {
            items: cartItems,
            totalAmount,
            paymentMethod: "card",
            shippingAddress: {
              street: "123 Street",
              city: "City",
              postalCode: "12345",
              country: "Pakistan",
            },
            paymentIntentId: paymentIntent.id,
          },
          { withCredentials: true }
        );

         // Empty cart
         setCartItems([]);
         setMessage("Payment & Order Successful!");
         setSuccess(true);
 
         toast.success("🎉 Payment & Order Successful! Redirecting...", {
           position: "top-center",
         });

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Order placement failed!", { position: "top-center" });
      }
    }

    setProcessing(false);
  };

  if (success) {
    return (
      <div className="success-animation">
        <h2>🎉 Order Placed Successfully! 🎉</h2>
        <p>Redirecting to Home...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="payment-form">
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || processing}
          className="pay-button"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </>
  );
};

const Checkout = ({
  clientSecret,
  cartItems,
  totalAmount,
  paymentIntentId,
  setCartItems,
}) => {
  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        cartItems={cartItems}
        totalAmount={totalAmount}
        paymentIntentId={paymentIntentId}
        setCartItems={setCartItems} // Pass setCartItems from parent to empty the cart
      />
    </Elements>
  );
};

export default Checkout;
