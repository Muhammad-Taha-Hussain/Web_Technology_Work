

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReactImageMagnify from 'react-image-magnify';
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [quantity, setQuantity] = useState(1); // default 1 quantity
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
//         setProduct(res.data.product);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleAddToCart = async () => {
//     if (!selectedSize || !selectedColor) {
//       setMessage('Please select both size and color.');
//       return;
//     }

//     try {
//         console.log(productId, quantity, selectedSize, selectedColor)
//       const res = await axios.post('http://localhost:5000/api/cart/add', {
//         productId,
//         quantity,
//         size: selectedSize,
//         color: selectedColor
//       }, {
//         withCredentials: true // for sending cookies (JWT/session)
//       });

//       setMessage(res.data.message || 'Item added to cart');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       setMessage('Error adding to cart');
//     }
//   };

//   if (!product) return <p>Loading product details...</p>;

//   return (
//     <div className="product-detail-container">
//       <div className="image-column">
//         <ReactImageMagnify {...{
//           smallImage: {
//             alt: product.name,
//             isFluidWidth: true,
//             src: product.images[0],
//           },
//           largeImage: {
//             src: product.images[0],
//             width: 1200,
//             height: 1200
//           },
//           enlargedImageContainerDimensions: {
//             width: '100%',
//             height: '100%'
//           },
//           enlargedImageContainerStyle: {
//             background: '#000',
//             zIndex: 999,
//           }
//         }} />
//       </div>

//       <div className="info-column">
//         <h2>{product.name}</h2>
//         <p className="price">${product.price}</p>

//         <div className="colors">
//           <h4>Available Colors:</h4>
//           <div className="color-options">
//             {product.colors.map((color, idx) => (
//               <span
//                 key={idx}
//                 className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
//                 style={{ backgroundColor: color }}
//                 title={color}
//                 onClick={() => setSelectedColor(color)}
//               ></span>
//             ))}
//           </div>
//         </div>

//         <div className="size-select">
//           <h4>Select Size:</h4>
//           <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
//             <option value="">--Select Size--</option>
//             {product.sizes.map((size, idx) => (
//               <option key={idx} value={size}>{size}</option>
//             ))}
//           </select>
//         </div>

//         <div className="quantity-select">
//           <h4>Quantity:</h4>
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//           />
//         </div>

//         <div className="description">
//           <h4>Description:</h4>
//           <p>{product.description}</p>
//         </div>

//         <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
//         {message && <p className="cart-message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import ReactImageMagnify from 'react-image-magnify';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); // Hook to navigate
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.warn('Please select both size and color.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/cart/add', {
        productId,
        quantity,
        size: selectedSize,
        color: selectedColor
      }, {
        withCredentials: true
      });

      toast.success(res.data.message || 'Item added to cart!');

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/cart'); // Your cart route
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart');
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-detail-container">
      <ToastContainer /> {/* Toastify container */}

      <div className="image-column">
        <ReactImageMagnify {...{
          smallImage: {
            alt: product.name,
            isFluidWidth: true,
            src: product.images[0],
          },
          largeImage: {
            src: product.images[0],
            width: 1200,
            height: 1200
          },
          enlargedImageContainerDimensions: {
            width: '100%',
            height: '100%'
          },
          enlargedImageContainerStyle: {
            background: '#000',
            zIndex: 999,
          }
        }} />
      </div>

      <div className="info-column">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>

        <div className="colors">
          <h4>Available Colors:</h4>
          <div className="color-options">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => setSelectedColor(color)}
              ></span>
            ))}
          </div>
        </div>

        <div className="size-select">
          <h4>Select Size:</h4>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">--Select Size--</option>
            {product.sizes.map((size, idx) => (
              <option key={idx} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="quantity-select">
          <h4>Quantity:</h4>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="description">
          <h4>Description:</h4>
          <p>{product.description}</p>
        </div>

        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
