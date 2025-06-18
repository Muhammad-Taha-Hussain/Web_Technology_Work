import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import "./SearchResultsPage.css"; // for grid/card styling

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const resetAndFetch = async () => {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/products/search`,
          {
            params: {
              query: queryParams.get("query") || "",
              category: queryParams.get("category") || "",
              page: 1, // always page 1 when query changes
              limit: 8,
            },
          }
        );

        const newProducts = res.data.products;
        setProducts(newProducts);
        setHasMore(newProducts.length >= 8); // if fetched less than 8 => no more pages
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    resetAndFetch();
  }, [location.search]); // only runs when query changes

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const res = await axios.get(`http://localhost:5000/api/products/search`, {
        params: {
          query: queryParams.get("query") || "",
          section: queryParams.get("section") || "",
          page: nextPage,
          limit: 8,
        },
      });

      const newProducts = res.data.products;
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length >= 8);
    } catch (err) {
      console.error("Fetching more error:", err);
    }
  };

  console.log(products);
  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      {!products && <p>No results found</p>}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className="spinner"></div>}
        endMessage={<p></p>}
      >
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.images[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchResultsPage;
