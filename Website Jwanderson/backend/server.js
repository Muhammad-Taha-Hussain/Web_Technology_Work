import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import Jw_Users from './models/Jw_Users.js';
import Jw_Products from './models/Jw_Products.js';
import Order from './models/Jw_orders.js';
import CartItem from './models/Jw_cart_items.js';
// import Jw_Favorites from './models/Jw_favorites.js';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/productRoutes.js';
import favoriteRoutes from './routes/favorite.route.js';
import searchRoutes from './routes/search.route.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';



dotenv.config();
const app = express();

const DB = 'mongodb+srv://Taha:dsaqw_2326@cluster0.pe989a7.mongodb.net/EcommerceDataBase'

// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));

mongoose.connect(DB)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:5173', // your frontend's origin
    credentials: true
  }));
// app.use(cors());
app.use(express.json());


// Routes
// app.use('/api/users', userRoutes);
app.get('/',(req, res) => {
  res.send('Hello World!');
})

// app.post('/api/users', async (req, res) => {
//   const { name, email, password } = req.body;

//   console.log('Received body:', req.body); // ✅ Add this


//   try {
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User created', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

app.get('/users', async (req, res) => {
  try {
    const users = await Jw_Users.find();

    console.log('Fetched users:', users); // ✅ Add this

    let html = `
      <html>
        <head><title>Users</title></head>
        <body>
          <h1>User List</h1>
          <ul>
            ${users.map(user => `<li>${user.name} - ${user.pass}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching users: ' + err.message);
  }
});

// app.get('/products', async (req, res) => {
//   try {
//     const product = await Product.find();

//     console.log('Fetched users:', product); // ✅ Add this

//     res.send('products');
//     // let html = `
//     //   <html>
//     //     <head><title>Users</title></head>
//     //     <body>
//     //       <h1>User List</h1>
//     //       <ul>
//     //         ${users.map(user => `<li>${user.name} - ${user.pass}</li>`).join('')}
//     //       </ul>
//     //     </body>
//     //   </html>
//     // `;

//     // res.send(html);
//   } catch (err) {
//     res.status(500).send('Error fetching users: ' + err.message);
//   }
// });


// app.get('/products', async (req, res) => {
//   try {
//     // insertProduct();

//     const product = await Jw_Products.find();
//     res.send(product); // Show JSON directly
//   } catch (err) {
//     res.status(500).send('Error: ' + err.message);
//   }
// });

app.use("/api/auth", authRoutes);

app.use('/api/products', productRoutes);

  app.use('/api/favorite', favoriteRoutes);

app.use('/api/products', searchRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/order', orderRoutes);

// PRODUCTS
app.get('/products', async (req, res) => {
  try {
    const products = await Jw_Products.find();
    let html = `
      <html>
        <head><title>Products</title></head>
        <body>
          <h1>Product List</h1>
          <ul>
            ${products.map(product => `
              <li>
                <strong>${product.name}</strong> - Rs. ${product.price} - ${product.category}
                <br/>
                Stock: ${product.stock} | Sizes: ${product.sizes.join(', ')} | Colors: ${product.colors.join(', ')}
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
});


// app.get('/orders', async (req, res) => {
//   try {
//     const order = await Order.find();

//     // console.log('Fetched users:', order); // ✅ Add this

//     res.send(order);
//     // let html = `
//     //   <html>
//     //     <head><title>Users</title></head>
//     //     <body>
//     //       <h1>User List</h1>
//     //       <ul>
//     //         ${users.map(user => `<li>${user.name} - ${user.pass}</li>`).join('')}
//     //       </ul>
//     //     </body>
//     //   </html>
//     // `;

//     // res.send(html);
//   } catch (err) {
//     res.status(500).send('Error fetching users: ' + err.message);
//   }
// });

// app.get('/cart-items', async (req, res) => {
//   try {
//     const cartItems = await CartItem.find();

//     console.log('Fetched users:', cartItems); // ✅ Add this

//     res.send(cartItems);

//     // let html = `
//     //   <html>
//     //     <head><title>Users</title></head>
//     //     <body>
//     //       <h1>User List</h1>
//     //       <ul>
//     //         ${users.map(user => `<li>${user.name} - ${user.pass}</li>`).join('')}
//     //       </ul>
//     //     </body>
//     //   </html>
//     // `;

//     // res.send(html);
//   } catch (err) {
//     res.status(500).send('Error fetching users: ' + err.message);
//   }
// });

// CART ITEMS
// ORDERS
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('items.productId');
    console.log('Fetched orders:', orders[0].items); // ✅ Add this
    let html = `
      <html>
        <head><title>Orders</title></head>
        <body>
          <h1>Order List</h1>
          <ul>
            ${orders.map(order => `
              <li>
                User: ${order.userId?.name || 'N/A'}<br/>
                Status: ${order.status}<br/>
                Amount: Rs. ${order.totalAmount}<br/>
                Items:
                <ul>
                  ${order.items.map(i => `
                    <li>
                      ${i.productId?.name || 'Unknown Product'} - Qty: ${i.quantity} - Rs. ${i.price}
                    </li>
                  `).join('')}
                </ul>
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching orders: ' + err.message);
  }
});


app.get('/cart-items', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('userId').populate('productId');
    console.log('Fetched cart items:', cartItems); // ✅ Add this
    let html = `
      <html>
        <head><title>Cart Items</title></head>
        <body>
          <h1>Cart Items</h1>
          <ul>
            ${cartItems.map(item => `
              <li>
                User: ${item.userId?.name || 'N/A'}<br/>
                Product: ${item.productId?.name || 'N/A'}<br/>
                Quantity: ${item.quantity} | Size: ${item.size} | Color: ${item.color}
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching cart items: ' + err.message);
  }
});

app.get('/favorite', async (req, res) => {
  try {
    const favorite = await Favorite.find();

    console.log('Fetched users:', favorite); // ✅ Add this

    res.send('favorite', { favorite });
    // let html = `
    //   <html>
    //     <head><title>Users</title></head>
    //     <body>
    //       <h1>User List</h1>
    //       <ul>
    //         ${users.map(user => `<li>${user.name} - ${user.pass}</li>`).join('')}
    //       </ul>
    //     </body>
    //   </html>
    // `;

    // res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching users: ' + err.message);
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Connect DB
// mongoose.connect(process.env.MONGO_URI, () =>
//   console.log('MongoDB Connected')
// );

app.listen(5000, () => console.log('Server started on port 5000'));




// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// // var expressLayouts = require("express-ejs-layouts");
// var mongoose = require("mongoose");

// //middlewares
// var indexRouter = require("./routes/index");
// // var protectedRouter = require("./routes/protected");
// // var sessionAuth = require("./middlewares/sessionAuth");
// // var superAdminMiddleware = require("./middlewares/super-admin");
// // var checkSessionAuth = require("./middlewares/checkSessionAuth");
// // var apiauth = require("./middlewares/apiauth");
// var session = require("express-session");
// var app = express();

// var bodyParser = require("body-parser");

// app.use(bodyParser.json());
// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));


// var config = require("config");
// app.use(
//   session({
//     secret: config.get("sessionSecret"),
//     cookie: { maxAge: 60000 },
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// const DB = 'mongodb+srv://Taha:dsaqw_2326@cluster0.pe989a7.mongodb.net/EcommerceDataBase'

// mongoose.connect(DB)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));

// // const { startCronJobs } = require("./croneJobs/index");
// // view engine setup
// // app.set("views", path.join(__dirname, "views"));
// // app.set("view engine", "ejs");

// // app.use(expressLayouts);
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, "public")));


// // app.use(
// //   "/super-admin",
// //   superAdminMiddleware,
// //   require("./routes/super-admin/dashboard")
// // );
// // app.use(
// //   "/super-admin",
// //   superAdminMiddleware,
// //   require("./routes/super-admin/products")
// // );


// // app.use("/api/public/products", require("./routes/api/public/products"));
// // app.use("/api/categories", require("./routes/api/categories"));
// // app.use("/api/products", apiauth, require("./routes/api/products"));
// // app.use("/api/auth", require("./routes/api/auth"));


// app.use("/", indexRouter);
// // app.use("/", sessionAuth, indexRouter);
// // app.use("/my-account", sessionAuth, checkSessionAuth, protectedRouter);
// // app.use("/", sessionAuth, require("./routes/shop"));
// // app.get("/admin", async (req, res) => {
// //   res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
// // });
// // app.get("/admin/*", async (req, res) => {
// //   res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
// // });
// // app.use(express.static(path.join(__dirname, "admin", "build")));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   console.error("Error:", err); // helpful debug log

//   res.status(err.status || 500).json({
//     status: "error",
//     message: err.message || "Internal Server Error",
//   });
// });
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get("env") === "development" ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.send("error");
// //   // res.render("error");
// // });


// const port = process.env.PORT || 3000;
// // const server = http.createServer(app);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // startCronJobs();
// module.exports = app;