import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Men = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/category', {
          params: { category: 'men' }, // 'men' is the category field in DB
        });
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching men products:', err);
      }
    };

    fetchMenProducts();
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
        <p>No men's products found.</p>
      )}
    </div>
  );
};

export default Men;
