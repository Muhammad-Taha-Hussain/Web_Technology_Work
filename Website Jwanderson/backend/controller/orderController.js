import Jw_orders from "../models/Jw_orders.js";
import Jw_cart_items from "../models/Jw_cart_items.js";
import Stripe from 'stripe';
const stripe = new Stripe('***REMOVED***_51PsQRY1om7WfioWhSRmZjWCD53ye3QtRdUJGUvtWDR8GEKOxcmzR0UL0oYZuQvTxiGOV6HcvhHz3gl5QcY1Ddyik00N0pRv7bZ'); // set in .env
// const stripe = require('stripe')("***REMOVED***_51PsQRY1om7WfioWhSRmZjWCD53ye3QtRdUJGUvtWDR8GEKOxcmzR0UL0oYZuQvTxiGOV6HcvhHz3gl5QcY1Ddyik00N0pRv7bZ");

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // in paisa or cents (Stripe smallest unit)
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        automatic_payment_methods: { enabled: true }, // for automatic handling
    });
  
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id  // send this to frontend
      });
    } catch (error) {
      console.error("Stripe PaymentIntent Error:", error);
      res.status(500).json({ error: "Payment Intent creation failed" });
    }
  };



//   export const placeOrder = async (req, res) => {
//     try {
//         const userId = req.userId; // retrieved from verifyToken
//         const { items, totalAmount, shippingAddress, paymentMethod, paymentIntentId } = req.body;

//         console.log('====================================');
//         console.log("Placing order for user:", userId);
//         console.log("PaymentIntentId:", paymentIntentId);
//         console.log('====================================');

//         // Validation checks
//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, message: "Order must contain at least one item" });
//         }
//         if (!totalAmount || totalAmount <= 0) {
//             return res.status(400).json({ success: false, message: "Invalid total amount" });
//         }
//         if (!shippingAddress || !shippingAddress.street) {
//             return res.status(400).json({ success: false, message: "Shipping address is required" });
//         }
//         if (!paymentIntentId) {
//             return res.status(400).json({ success: false, message: "PaymentIntentId is missing" });
//         }

//         // Verify payment with Stripe
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//         if (!paymentIntent || paymentIntent.status !== 'succeeded') {
//             return res.status(400).json({ success: false, message: "Payment failed or not completed" });
//         }

//         // Create and save order
//         const newOrder = new Jw_orders({
//             userId,
//             items,
//             totalAmount,
//             shippingAddress,
//             paymentMethod,
//             paymentInfo: {
//                 id: paymentIntent.id,
//                 status: paymentIntent.status,
//             },
//         });

//         await newOrder.save();

//         res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };




export const placeOrder = async (req, res) => {
    try {
        const userId = req.userId; // retrieved from verifyToken
        const { items, totalAmount, shippingAddress, paymentMethod, paymentIntentId } = req.body;

        console.log('====================================');
        console.log("Placing order for user:", userId);
        console.log("PaymentIntentId:", paymentIntentId);
        console.log('====================================');

        // Validation checks
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one item" });
        }
        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid total amount" });
        }
        if (!shippingAddress || !shippingAddress.street) {
            return res.status(400).json({ success: false, message: "Shipping address is required" });
        }
        if (!paymentIntentId) {
            return res.status(400).json({ success: false, message: "PaymentIntentId is missing" });
        }

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ success: false, message: "Payment failed or not completed" });
        }

        // Create and save the order
        const newOrder = new Jw_orders({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentInfo: {
                id: paymentIntent.id,
                status: paymentIntent.status,
            },
        });

        await newOrder.save();

        // ❗❗ Empty the user's cart (Important Part)
        const deletedItems = await Jw_cart_items.deleteMany({ userId });


        console.log("Cart emptied for user:", deletedItems);

        res.status(201).json({ success: true, message: "Order placed successfully, cart emptied", order: newOrder });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
