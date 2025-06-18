// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import logo from "../assets/JWA.png";
// import flag from "../assets/pak.png";
// import { Link } from "react-router-dom";
// import {
//   FaSearch,
//   FaUser,
//   FaHeart,
//   FaShoppingBag,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
// } from "react-icons/fa";

// const Navbar = ({ isAuthenticated }) => {
//   // const [hideTopBar, setHideTopBar] = useState(false);
//   // const [hideMainNavbar, setHideMainNavbar] = useState(false);

//   // useEffect(() => {
//   //     const handleScroll = () => {
//   //         const scrollY = window.scrollY;

//   // if (scrollY > 100) {
//   //     setHideTopBar(true);
//   // } else {
//   //     setHideTopBar(false);
//   // }

//   // if (scrollY > 200) {
//   //     setHideMainNavbar(true);
//   // } else {
//   //     setHideMainNavbar(false);
//   // }
//   //     };

//   //     window.addEventListener('scroll', handleScroll);
//   //     return () => window.removeEventListener('scroll', handleScroll);
//   // }, []);

//   return (
//     <div className="navbar-wrapper">
//       {/* 🔹 Top Scrolling Bar */}
//       <div className={`top-bar `}>
//         <FaAngleDoubleLeft className="arrow" />
//         <span className="top-text">Shop The Loafer Bag</span>
//         <FaAngleDoubleRight className="arrow" />
//       </div>

//       <div className="sticky-wrapper">
//         {/* 🔹 Main Navbar */}
//         <div className={`main-navbar`}>
//           {/* Left: Search */}
//           <div className="search-box">
//             <input type="text" placeholder="Search" />
//             <FaSearch className="search-icon" />
//           </div>

//           {/* Center: Logo */}
//           <div className="logo">
//             <Link to="/home">
//               {/* Add Home link */}
//               <img src={logo} alt="JWA Logo" />
//             </Link>
//           </div>

//           {/* Right: Icons */}
//           <div className="icons">
//             <div className="flag">
//               <img src={flag} alt="PK" />
//               <span>PK</span>
//             </div>
//             {!isAuthenticated && (
//               <Link to="/signin">
//                 <FaUser className="icon" />
//               </Link>
//             )}
//             <Link to="/wishlist">
//               <FaHeart className="icon" />
//             </Link>
//             <Link to="/cart">
//               <FaShoppingBag className="icon" />
//             </Link>
//           </div>
//         </div>

//         {/* 🔹 Navigation Links */}
//         <div className="nav-links">
//           <Link to="/sale" className="sale">
//             SALE
//           </Link>
//           <Link to="/new">NEW</Link>
//           <Link to="/women">WOMEN</Link>

//           {/* 🔽 MEN with Mega Menu */}
//           <div className="men-hover">
//             <Link to="/men">MEN</Link>
//             <div className="mega-menu">
//               <div className="menu-column">
//                 <h4>CLOTHING</h4>
//                 <ul>
//                   <li>
//                     <Link to="/all-clothing">All Clothing</Link>
//                   </li>
//                   <li>
//                     <Link to="/coats-jackets">Coats & Jackets</Link>
//                   </li>
//                   <li>
//                     <Link to="/knitwear">Knitwear</Link>
//                   </li>
//                   <li>
//                     <Link to="/hoodies">Sweatshirts & Hoodies</Link>
//                   </li>
//                   <li>
//                     <Link to="/tops-shirts">Tops & Shirts</Link>
//                   </li>
//                   <li>
//                     <Link to="/t-shirts">T-Shirts</Link>
//                   </li>
//                   <li>
//                     <Link to="/trousers-shorts">Trousers & Shorts</Link>
//                   </li>
//                   <li>
//                     <Link to="/denim">Denim</Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="menu-column">
//                 <h4>BAGS</h4>
//                 <ul>
//                   <li>
//                     <Link to="/all-bags">All Bags</Link>
//                   </li>
//                   <li>
//                     <Link to="/crossbody-bags">Crossbody Bags</Link>
//                   </li>
//                   <li>
//                     <Link to="/shoulder-bags">Shoulder Bags</Link>
//                   </li>
//                   <li>
//                     <Link to="/tote-bags">Tote Bags</Link>
//                   </li>
//                   <li>
//                     <Link to="/top-handle-bags">Top Handle Bags</Link>
//                   </li>
//                   <li>
//                     <Link to="/mini-bags">Mini Bags & Clutches</Link>
//                   </li>
//                   <li>
//                     <em>New Silhouettes</em>
//                   </li>
//                   <li>
//                     <em>Loafer Bag</em>
//                   </li>
//                   <li>
//                     <em>Bumper Bag</em>
//                   </li>
//                 </ul>
//               </div>
//               <div className="menu-column">
//                 <h4>SHOES</h4>
//                 <ul>
//                   <li>
//                     <Link to="/all-shoes">All Shoes</Link>
//                   </li>
//                   <li>
//                     <Link to="/loafers">Loafers</Link>
//                   </li>
//                   <li>
//                     <Link to="/boots">Boots</Link>
//                   </li>
//                   <li>
//                     <em>Chain Loafer</em>
//                   </li>
//                 </ul>
//               </div>
//               <div className="menu-column">
//                 <h4>ACCESSORIES</h4>
//                 <ul>
//                   <li>
//                     <Link to="/all-accessories">All Accessories</Link>
//                   </li>
//                   <li>
//                     <Link to="/hats">Hats</Link>
//                   </li>
//                   <li>
//                     <Link to="/jewellery">Jewellery</Link>
//                   </li>
//                   <li>
//                     <Link to="/scarves">Scarves & Neckbands</Link>
//                   </li>
//                   <li>
//                     <Link to="/leather-goods">Small Leather Goods</Link>
//                   </li>
//                   <li>
//                     <Link to="/sunglasses">Sunglasses</Link>
//                   </li>
//                   <li>
//                     <Link to="/other-accessories">Other Accessories</Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="menu-image">
//                 <img src="https://via.placeholder.com/200x300" alt="Lookbook" />
//               </div>
//             </div>
//           </div>

//           <Link to="/bags">BAGS</Link>
//           <Link to="/about">ABOUT</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React from 'react';
// import './Navbar.css';
// import logo from '../assets/JWA.png';
// import flag from '../assets/pak.png';
// import { Link } from 'react-router-dom';
// import {
//     FaSearch,
//     FaUser,
//     FaHeart,
//     FaShoppingBag,
//     FaAngleDoubleLeft,
//     FaAngleDoubleRight,
// } from 'react-icons/fa';

// const Navbar = () => {
//     return (
//         <div className="navbar-wrapper">
//             {/* 🔹 Top Scrolling Bar */}
//             <div className="top-bar">
//                 <FaAngleDoubleLeft className="arrow" />
//                 <span className="top-text">Shop The Loafer Bag</span>
//                 <FaAngleDoubleRight className="arrow" />
//             </div>

//             {/* 🔹 Main Navbar */}
//             <div className="main-navbar">
//                 {/* Left: Search */}
//                 <div className="search-box">
//                     <input type="text" placeholder="Search" />
//                     <FaSearch className="search-icon" />
//                 </div>

//                 {/* Center: Logo */}
//                 <div className="logo">
//                     <Link to="/Home">
//                     <img src={logo} alt="JWA Logo" />
//                     </Link>

//                 </div>

//                 {/* Right: Icons */}
//                 <div className="icons">
//                     <div className="flag">
//                         <img src={flag} alt="PK" />
//                         <span>PK</span>
//                     </div>
//                     <FaUser className="icon" />
//                     <Link to="/signin">
//                         <FaHeart className="icon" />
//                     </Link>
//                     <Link to="/cart">
//                         <FaShoppingBag className="icon" />
//                     </Link>

//                 </div>
//             </div>

//             {/* 🔹 Navigation Links */}
//             <div className="nav-links">
//                 <a href="#" className="sale">SALE</a>
//                 <a href="#">NEW</a>
//                 <a href="#">WOMEN</a>

//                 {/* 🔽 MEN with Mega Menu */}
//                 <div className="men-hover">
//                     <a href="#">MEN</a>
//                     <div className="mega-menu">
//                         <div className="menu-column">
//                             <h4>CLOTHING</h4>
//                             <ul>
//                                 <li><Link to="/all-clothing">All Clothing</Link></li>
//                                 <li>Coats & Jackets</li>
//                                 <li>Knitwear</li>
//                                 <li>Sweatshirts & Hoodies</li>
//                                 <li>Tops & Shirts</li>
//                                 <li>T-Shirts</li>
//                                 <li>Trousers & Shorts</li>
//                                 <li>Denim</li>
//                             </ul>
//                         </div>
//                         <div className="menu-column">
//                             <h4>BAGS</h4>
//                             <ul>
//                                 <li>All Bags</li>
//                                 <li>Crossbody Bags</li>
//                                 <li>Shoulder Bags</li>
//                                 <li>Tote Bags</li>
//                                 <li>Top Handle Bags</li>
//                                 <li>Mini Bags & Clutches</li>
//                                 <li><em>New Silhouettes</em></li>
//                                 <li><em>Loafer Bag</em></li>
//                                 <li><em>Bumper Bag</em></li>
//                             </ul>
//                         </div>
//                         <div className="menu-column">
//                             <h4>SHOES</h4>
//                             <ul>
//                                 <li>All Shoes</li>
//                                 <li>Loafers</li>
//                                 <li>Boots</li>
//                                 <li><em>Chain Loafer</em></li>
//                             </ul>
//                         </div>
//                         <div className="menu-column">
//                             <h4>ACCESSORIES</h4>
//                             <ul>
//                                 <li>All Accessories</li>
//                                 <li>Hats</li>
//                                 <li>Jewellery</li>
//                                 <li>Scarves & Neckbands</li>
//                                 <li>Small Leather Goods</li>
//                                 <li>Sunglasses</li>
//                                 <li>Other Accessories</li>
//                             </ul>
//                         </div>
//                         <div className="menu-image">
//                             <img src="https://via.placeholder.com/200x300" alt="Lookbook" />
//                         </div>
//                     </div>
//                 </div>

//                 <a href="#">BAGS</a>
//                 <a href="#">ABOUT</a>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/JWA.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";

const Navbar = ({ isAuthenticated }) => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null); // 👈 create ref


  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchQuery(""); // Reset only if not on search page
    }  }, [location.pathname])


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTopBarVisible(false);
    }, 5000); // Hide after 5 seconds

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTopBarVisible(false);
      } else {
        setIsTopBarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    let category = "all"; // default

    if (inputRef.current) {
      inputRef.current.blur(); // 👈 remove focus
    }

    if (location.pathname.includes("/men")) category = "men";
    else if (location.pathname.includes("/women")) category = "women";
    else if (location.pathname.includes("/bags")) category = "bags";

    // Now navigate to search results page with query + category
    navigate(`/search?query=${searchQuery}&category=${category}`);

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className={`top-bar ${isTopBarVisible ? "visible" : "hidden"}`}>
        <span className="top-text">Shop The Loafer Bag</span>
      </div>

      <div className="sticky-wrapper">
        <div className="main-navbar">
          {/* Left: Search */}
          <div className="search-box">
            <input
             ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}            />
            <FaSearch className="search-icon" onClick={handleSearch} />
          </div>

          {/* Center: Logo */}
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="JWA Logo" />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="icons">
            <div className="flag">
              <img src="https://flagcdn.com/w20/gb.png" alt="GB" />{" "}
              {/* Updated to UK flag */}
              <span>GB</span>
            </div>
            {!isAuthenticated && (
              <Link to="/signin">
                <FaUser className="icon" />
              </Link>
            )}
            <Link to="/wishlist">
              <FaHeart className="icon" />
            </Link>
            <Link to="/cart">
              <FaShoppingBag className="icon" />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <div className="link">
            <Link to="/sale" className="sale">
              SALE
            </Link>
          </div>
          <div className="link">
            <Link className="linke" to="/new">
              NEW
            </Link>
          </div>
          <div className="link">
            <Link className="linke" to="/women">
              WOMEN
            </Link>
          </div>
          <div className="men-hover">
            <Link className="" to="/men">
              MEN
            </Link>
            <div className="mega-menu">
              <div className="menu-column">
                <h4>CLOTHING</h4>
                <ul>
                  <li>
                    <Link to="/all-clothing">All Clothing</Link>
                  </li>
                  <li>
                    <Link to="/coats-jackets">Coats & Jackets</Link>
                  </li>
                  <li>
                    <Link to="/knitwear">Knitwear</Link>
                  </li>
                  <li>
                    <Link to="/hoodies">Sweatshirts & Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/tops-shirts">Tops & Shirts</Link>
                  </li>
                  <li>
                    <Link to="/t-shirts">T-Shirts</Link>
                  </li>
                  <li>
                    <Link to="/trousers-shorts">Trousers & Shorts</Link>
                  </li>
                  <li>
                    <Link to="/denim">Denim</Link>
                  </li>
                </ul>
              </div>
              <div className="menu-column">
                <h4>BAGS</h4>
                <ul>
                  <li>
                    <Link to="/all-bags">All Bags</Link>
                  </li>
                  <li>
                    <Link to="/crossbody-bags">Crossbody Bags</Link>
                  </li>
                  <li>
                    <Link to="/shoulder-bags">Shoulder Bags</Link>
                  </li>
                  <li>
                    <Link to="/tote-bags">Tote Bags</Link>
                  </li>
                  <li>
                    <Link to="/top-handle-bags">Top Handle Bags</Link>
                  </li>
                  <li>
                    <Link to="/mini-bags">Mini Bags & Clutches</Link>
                  </li>
                  <li>
                    <em>New Silhouettes</em>
                  </li>
                  <li>
                    <em>Loafer Bag</em>
                  </li>
                  <li>
                    <em>Bumper Bag</em>
                  </li>
                </ul>
              </div>
              <div className="menu-column">
                <h4>SHOES</h4>
                <ul>
                  <li>
                    <Link to="/all-shoes">All Shoes</Link>
                  </li>
                  <li>
                    <Link to="/loafers">Loafers</Link>
                  </li>
                  <li>
                    <Link to="/boots">Boots</Link>
                  </li>
                  <li>
                    <em>Chain Loafer</em>
                  </li>
                </ul>
              </div>
              <div className="menu-column">
                <h4>ACCESSORIES</h4>
                <ul>
                  <li>
                    <Link to="/all-accessories">All Accessories</Link>
                  </li>
                  <li>
                    <Link to="/hats">Hats</Link>
                  </li>
                  <li>
                    <Link to="/jewellery">Jewellery</Link>
                  </li>
                  <li>
                    <Link to="/scarves">Scarves & Neckbands</Link>
                  </li>
                  <li>
                    <Link to="/leather-goods">Small Leather Goods</Link>
                  </li>
                  <li>
                    <Link to="/sunglasses">Sunglasses</Link>
                  </li>
                  <li>
                    <Link to="/other-accessories">Other Accessories</Link>
                  </li>
                </ul>
              </div>
              <div className="menu-image">
                <img src="https://via.placeholder.com/200x300" alt="Lookbook" />
              </div>
            </div>
          </div>
          <div className="link">
            <Link className="linke" to="/bags">
              BAGS
            </Link>
          </div>
          <div className="link">
            <Link className="linke" to="/about">
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
