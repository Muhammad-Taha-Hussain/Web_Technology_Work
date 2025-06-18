import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './favorites.css'; // create this if needed for styling

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorite/get', {
          withCredentials: true, // sends the cookie
        });

        console.log("Favorites:", response.data.favorites);
        setFavorites(response.data.favorites);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Not authenticated, redirect to login
          alert('Please login to see your favorites.');
          navigate('/signin');
        } else {
          console.error('Error fetching favorites:', err);
          setError('Failed to load favorites.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  if (loading) return <div>Loading favorites...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => {
            const product = fav.productId; // populated product data
            return (
              <div key={product._id} className="favorite-card">
                <img src={product.images[0]} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
