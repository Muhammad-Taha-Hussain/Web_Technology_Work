import React from 'react';
import modell from '../assets/modell.png'
import './allclothing.css';

const products = [
  { id: 1, name: 'Cotton T-Shirt', price: '$25.00', image: modell },
  { id: 2, name: 'Denim Jacket', price: '$60.00', image: modell },
  { id: 3, name: 'Hooded Sweatshirt', price: '$40.00', image: modell },
  { id: 4, name: 'Slim Fit Jeans', price: '$55.00', image: modell },
  { id: 5, name: 'Coat with Belt', price: '$90.00', image: modell },
  { id: 6, name: 'Casual Shirt', price: '$35.00', image: modell },
];


const AllClothing = () => {
  return (
    <div className="clothing-page">
      <h1 className="clothing-header">All Clothing</h1>

      <div className="clothing-container">
        <aside className="sidebar">
          <h2>Filter By</h2>
          <label><input type="checkbox" /> T-Shirts</label>
          <label><input type="checkbox" /> Hoodies</label>
          <label><input type="checkbox" /> Jackets</label>
          <label><input type="checkbox" /> Denim</label>
        </aside>

        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClothing;
