import React from 'react';
import './Navbar.css';
import logo from '../assets/JWA.png';
import flag from '../assets/pak.png';
import { Link } from 'react-router-dom';
import {
    FaSearch,
    FaUser,
    FaHeart,
    FaShoppingBag,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            {/* 🔹 Top Scrolling Bar */}
            <div className="top-bar">
                <FaAngleDoubleLeft className="arrow" />
                <span className="top-text">Shop The Loafer Bag</span>
                <FaAngleDoubleRight className="arrow" />
            </div>

            {/* 🔹 Main Navbar */}
            <div className="main-navbar">
                {/* Left: Search */}
                <div className="search-box">
                    <input type="text" placeholder="Search" />
                    <FaSearch className="search-icon" />
                </div>

                {/* Center: Logo */}
                <div className="logo">
                    <img src={logo} alt="JWA Logo" />
                </div>

                {/* Right: Icons */}
                <div className="icons">
                    <div className="flag">
                        <img src={flag} alt="PK" />
                        <span>PK</span>
                    </div>
                    <FaUser className="icon" />
                    <Link to="/signin">
                        <FaHeart className="icon" />
                    </Link>
                    <FaShoppingBag className="icon" />
                </div>
            </div>

            {/* 🔹 Navigation Links */}
            <div className="nav-links">
                <a href="#" className="sale">SALE</a>
                <a href="#">NEW</a>
                <a href="#">WOMEN</a>

                {/* 🔽 MEN with Mega Menu */}
                <div className="men-hover">
                    <a href="#">MEN</a>
                    <div className="mega-menu">
                        <div className="menu-column">
                            <h4>CLOTHING</h4>
                            <ul>
                                <li>All Clothing</li>
                                <li>Coats & Jackets</li>
                                <li>Knitwear</li>
                                <li>Sweatshirts & Hoodies</li>
                                <li>Tops & Shirts</li>
                                <li>T-Shirts</li>
                                <li>Trousers & Shorts</li>
                                <li>Denim</li>
                            </ul>
                        </div>
                        <div className="menu-column">
                            <h4>BAGS</h4>
                            <ul>
                                <li>All Bags</li>
                                <li>Crossbody Bags</li>
                                <li>Shoulder Bags</li>
                                <li>Tote Bags</li>
                                <li>Top Handle Bags</li>
                                <li>Mini Bags & Clutches</li>
                                <li><em>New Silhouettes</em></li>
                                <li><em>Loafer Bag</em></li>
                                <li><em>Bumper Bag</em></li>
                            </ul>
                        </div>
                        <div className="menu-column">
                            <h4>SHOES</h4>
                            <ul>
                                <li>All Shoes</li>
                                <li>Loafers</li>
                                <li>Boots</li>
                                <li><em>Chain Loafer</em></li>
                            </ul>
                        </div>
                        <div className="menu-column">
                            <h4>ACCESSORIES</h4>
                            <ul>
                                <li>All Accessories</li>
                                <li>Hats</li>
                                <li>Jewellery</li>
                                <li>Scarves & Neckbands</li>
                                <li>Small Leather Goods</li>
                                <li>Sunglasses</li>
                                <li>Other Accessories</li>
                            </ul>
                        </div>
                        <div className="menu-image">
                            <img src="https://via.placeholder.com/200x300" alt="Lookbook" />
                        </div>
                    </div>
                </div>

                <a href="#">BAGS</a>
                <a href="#">ABOUT</a>
            </div>
        </div>
    );
};

export default Navbar;