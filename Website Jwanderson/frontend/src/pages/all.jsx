import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa'; // using react-icons
import './all.css';
import Cookies from "js-cookie"; // cookie handling
import { useNavigate } from "react-router-dom"; // for redirection

const All = () => {
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState(4);
  const [filters, setFilters] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate(); // for redirect


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/all');
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleColumnChange = (cols) => {
    setColumns(cols);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilters(prevFilters =>
      e.target.checked
        ? [...prevFilters, value]
        : prevFilters.filter(f => f !== value)
    );
  };

  const filteredProducts = products.filter(product => {
    if (filters.length === 0) return true;
    const combinedText = (product.name + ' ' + product.description).toLowerCase();
    return filters.some(filter => combinedText.includes(filter.toLowerCase()));
  });

  const handleFavoriteClick = async (productId) => {

    try {
      const response = await axios.post(
        "http://localhost:5000/api/favorite/add",
        { productId },
        {
          withCredentials: true // ✅ Only this needed if backend reads from cookie
        }
      );
      
      alert("Added to favorites!");
      navigate('/wishlist')
      // Optionally, you can refetch favorites or update the UI
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add favorite.");
    }
  };

  return (
    <div className="clothing-page">
      <div className="clothing-header-row">
        <h1 className="clothing-header">All</h1>
        <div className="column-selector">
          <span>View: </span>
          <a href="#" onClick={() => handleColumnChange(4)} className={columns === 4 ? 'active' : ''}>4</a> | 
          <a href="#" onClick={() => handleColumnChange(5)} className={columns === 5 ? 'active' : ''}>5</a>
        </div>
      </div>

      <div className="clothing-container">
        <aside className="sidebar">
          <h2>Filter By</h2>
          <div className='filt'>
          <label><input type="checkbox" value="T-Shirt" onChange={handleFilterChange} /> T-Shirts</label>
          <label><input type="checkbox" value="Hoodie" onChange={handleFilterChange} /> Hoodies</label>
          <label><input type="checkbox" value="Jacket" onChange={handleFilterChange} /> Jackets</label>
          <label><input type="checkbox" value="Denim" onChange={handleFilterChange} /> Denim</label>

          </div>
        </aside>

        <div className={`product-grid columns-${columns}`}>
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <div className="image-container">
                <button className="favorite-btn" onClick={() => handleFavoriteClick(product._id)}>
                  <FaHeart />
                </button>
                <img src={product.images[0]} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default All;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie'; // cookie handling
// import { useNavigate } from 'react-router-dom'; // for redirection
// import { FaHeart } from 'react-icons/fa';
// import './all.css';

// const All = () => {
//   const [products, setProducts] = useState([]);
//   const [columns, setColumns] = useState(4);
//   const [filters, setFilters] = useState([]);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const navigate = useNavigate(); // for redirect


//   // Check if user is authenticated (on app load)
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/auth/check-auth', { withCredentials: true });
//         console.log("Auth check response:", res.data);
        
//         if (res.data.success) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setAuthChecked(true);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/products/all');
//         setProducts(res.data.products);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

  
//   if (!authChecked) {
//     return <div>Loading...</div>; // or a spinner component
//   }


//   const handleColumnChange = (cols) => {
//     setColumns(cols);
//   };

//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilters(prevFilters =>
//       e.target.checked
//         ? [...prevFilters, value]
//         : prevFilters.filter(f => f !== value)
//     );
//   };

//   const handleFavoriteClick = async (productId) => {
//     const userToken = Cookies.get('token'); // or any key you store in cookie

//     if (!userToken) {
//       navigate('/signin'); // redirect to signin if not logged in
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/favorites/add', 
//         { productId },
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
//       alert('Added to favorites!');
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//       alert('Failed to add favorite.');
//     }
//   };

//   const filteredProducts = products.filter(product => {
//     if (filters.length === 0) return true;
//     const combinedText = (product.name + ' ' + product.description).toLowerCase();
//     return filters.some(filter => combinedText.includes(filter.toLowerCase()));
//   });

//   return (
//     <div className="clothing-page">
//       <div className="clothing-header-row">
//         <h1 className="clothing-header">All</h1>
//         <div className="column-selector">
//           <span>View: </span>
//           <a href="#" onClick={() => handleColumnChange(4)} className={columns === 4 ? 'active' : ''}>4</a> | 
//           <a href="#" onClick={() => handleColumnChange(5)} className={columns === 5 ? 'active' : ''}>5</a>
//         </div>
//       </div>

//       <div className="clothing-container">
//         <aside className="sidebar">
//           <h2>Filter By</h2>
//           <label><input type="checkbox" value="T-Shirt" onChange={handleFilterChange} /> T-Shirts</label>
//           <label><input type="checkbox" value="Hoodie" onChange={handleFilterChange} /> Hoodies</label>
//           <label><input type="checkbox" value="Jacket" onChange={handleFilterChange} /> Jackets</label>
//           <label><input type="checkbox" value="Denim" onChange={handleFilterChange} /> Denim</label>
//         </aside>

//         <div className={`product-grid columns-${columns}`}>
//           {filteredProducts.map(product => (
//             <div key={product._id} className="product-card">
//               <div className="image-container">
//                 <button 
//                   className="favorite-btn" 
//                   onClick={() => handleFavoriteClick(product._id)}
//                 >
//                   <FaHeart />
//                 </button>
//                 <img src={product.images[0]} alt={product.name} />
//               </div>
//               <h3>{product.name}</h3>
//               <p>${product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default All;
