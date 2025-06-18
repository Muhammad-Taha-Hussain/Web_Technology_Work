import React, { useState, useEffect } from "react";
import "./Home.css";
import male from "../assets/male.png";
import female from "../assets/female.png";
import product1 from "../assets/jacket.png";
import product2 from "../assets/jacket.png";
import product3 from "../assets/jacket.png";
import product4 from "../assets/jacket.png";
import product5 from "../assets/jacket.png";
import product6 from "../assets/jacket.png";
import banner from "../assets/banner.png";
import product7 from "../assets/bag.png";
import product8 from "../assets/bag.png";
import product9 from "../assets/bag.png";
import product10 from "../assets/bag.png";
import product11 from "../assets/bag.png";
import product12 from "../assets/bag.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  // const products = [product1, product2, product3, product4, product5, product6];
  const moreProducts = [
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
  ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMixedProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/mixed",
          {
            params: { limit: 12 }, // fetch 12 random or mixed products
          }
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching mixed products:", error);
      }
    };

    fetchMixedProducts();
  }, []);

  console.log("====================================");
  console.log(products);
  console.log("====================================");

  const openDetail = (productId) => {
    console.log("====================================");
    console.log(productId);
    console.log("====================================");
    navigate(`/products/${productId}`);
  };

  return (
    <div className="home-wrapper">
      {/* Hero section */}
      <div className="home-container">
        <div className="half half-left">
          <Link to="/women">
            <img src={female} alt="Women Collection" className="home-image" />
            <div className="shop-text">
              Women
              <br />
              <span>Shop Now</span>
            </div>
          </Link>
        </div>

        <div className="half half-right">
          <Link to="/men">
            <img src={male} alt="Men Collection" className="home-image" />
            <div className="shop-text">
              Men
              <br />
              <span>Shop Now</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Product section */}
      <div className="product-gallery">
        {products.map((product) => (
          <div
            onClick={() => openDetail(product._id)}
            className="product-card"
            key={product._id}
          >
            <img className="image" src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            {/* <p>${product.price}</p>
            <p>{product.description.slice(0, 10)}...</p> */}
          </div>
        ))}
      </div>

      <div className="banner-wrapper">
        <Link to="/loafer-bag" className="banner-link">
          <img src={banner} alt="Loafer Bag Banner" className="banner-image" />
          <div className="banner-text">
            The Loafer Bag
            <br />
            <span>Shop Now</span>
          </div>
        </Link>
      </div>

      <div className="product-gallery">
        {moreProducts.map((image, index) => (
          <div className="product-card" key={`row2-${index}`}>
            <img src={image} alt={`Product Row 2 - ${index + 1}`} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
