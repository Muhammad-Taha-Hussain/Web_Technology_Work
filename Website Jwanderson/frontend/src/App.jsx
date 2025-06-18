import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import AllClothing from "./pages/allclothing";
import "./App.css";
import EmailVerification from "./pages/emailverification";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "./pages/ProductForm";
import All from "./pages/all";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import Favorites from "./pages/favourite";
import SearchResults from "./pages/SearchResults";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetail from "./pages/productDetail";

// Dummy Components for now:
const About = () => <h1 className="h1">About Page Coming Soon</h1>;
const Bags = () => <h1>Bags Page Coming Soon</h1>;
const Sale = () => <h1>Sale Page Coming Soon</h1>;
const New = () => <h1>New Page Coming Soon</h1>;
// const Women = () => <h1>Women Page Coming Soon</h1>;
// const Men = () => <h1 className="h1">Men Page Coming Soon</h1>;
const Wishlist = () => <h1>Wishlist Page Coming Soon</h1>;
// const Cart = () => <h1>Cart Page Coming Soon</h1>;

const CoatsJackets = () => <h1>Coats & Jackets Page</h1>;
const Knitwear = () => <h1>Knitwear Page</h1>;
const Hoodies = () => <h1>Sweatshirts & Hoodies Page</h1>;
const TopsShirts = () => <h1>Tops & Shirts Page</h1>;
const TShirts = () => <h1>T-Shirts Page</h1>;
const TrousersShorts = () => <h1>Trousers & Shorts Page</h1>;
const Denim = () => <h1>Denim Page</h1>;

const AllBags = () => (
  <div className="center-container">
    <h1 className="h1">All Bags Page</h1>
  </div>
);
const CrossbodyBags = () => <h1>Crossbody Bags Page</h1>;
const ShoulderBags = () => <h1>Shoulder Bags Page</h1>;
const ToteBags = () => <h1>Tote Bags Page</h1>;
const TopHandleBags = () => <h1>Top Handle Bags Page</h1>;
const MiniBags = () => <h1>Mini Bags & Clutches Page</h1>;

const AllShoes = () => <h1>All Shoes Page</h1>;
const Loafers = () => <h1>Loafers Page</h1>;
const Boots = () => <h1>Boots Page</h1>;

const AllAccessories = () => <h1>All Accessories Page</h1>;
const Hats = () => <h1>Hats Page</h1>;
const Jewellery = () => <h1>Jewellery Page</h1>;
const Scarves = () => <h1>Scarves & Neckbands Page</h1>;
const LeatherGoods = () => <h1>Small Leather Goods Page</h1>;
const Sunglasses = () => <h1>Sunglasses Page</h1>;
const OtherAccessories = () => <h1>Other Accessories Page</h1>;
const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated (on app load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          { withCredentials: true }
        );
        console.log("Auth check response:", res.data);

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>; // or a spinner component
  }
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
      {/* <Route path="*" element={<Navigate to="/home" />} /> */}

        {/* Redirect to home if logged in */}
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />}
        />
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* Search Route */}
        <Route path="/search" element={<SearchResults />} />

        {/* Main Website Section */}
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all-clothing" element={<AllClothing />} />
        <Route path="/all" element={<All />} />
        <Route path="/about" element={<About />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/new" element={<New />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/wishlist" element={<Favorites />} />
        {/* <Route path="/cart" element={<Cart />} /> */}

        {/* Clothing Sub Routes */}
        <Route path="/coats-jackets" element={<CoatsJackets />} />
        <Route path="/knitwear" element={<Knitwear />} />
        <Route path="/hoodies" element={<Hoodies />} />
        <Route path="/tops-shirts" element={<TopsShirts />} />
        <Route path="/t-shirts" element={<TShirts />} />
        <Route path="/trousers-shorts" element={<TrousersShorts />} />
        <Route path="/denim" element={<Denim />} />

        {/* Bags Sub Routes */}
        <Route path="/all-bags" element={<AllBags />} />
        <Route path="/crossbody-bags" element={<CrossbodyBags />} />
        <Route path="/shoulder-bags" element={<ShoulderBags />} />
        <Route path="/tote-bags" element={<ToteBags />} />
        <Route path="/top-handle-bags" element={<TopHandleBags />} />
        <Route path="/mini-bags" element={<MiniBags />} />

        {/* Shoes Sub Routes */}
        <Route path="/all-shoes" element={<AllShoes />} />
        <Route path="/loafers" element={<Loafers />} />
        <Route path="/boots" element={<Boots />} />

        {/* Accessories Sub Routes */}
        <Route path="/all-accessories" element={<AllAccessories />} />
        <Route path="/hats" element={<Hats />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/scarves" element={<Scarves />} />
        <Route path="/leather-goods" element={<LeatherGoods />} />
        <Route path="/sunglasses" element={<Sunglasses />} />
        <Route path="/other-accessories" element={<OtherAccessories />} />
      </Routes>
    </Router>
  );
}

export default App;
