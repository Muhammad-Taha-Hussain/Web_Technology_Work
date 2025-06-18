import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Women = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/category', {
          params: { category: 'women' }, // 'women' as per your DB field
        });
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching women products:', err);
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description.slice(0, 50)}...</p>
          </div>
        ))
      ) : (
        <p>No women's products found.</p>
      )}
    </div>
  );
};

export default Women;
