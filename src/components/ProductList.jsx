import React, { useContext, useState, useRef, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import "../styles.css";

const ProductList = () => {
  const { products, setProducts = () => {} } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const observer = useRef();

  useEffect(() => {
    if (!loading) {
      fetchMoreProducts();
    }
  }, [visibleProducts]);

  const fetchMoreProducts = (limit) => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=${limit || visibleProducts}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, ...data]); // Append new data
        setLoading(false);
      });
  };

  const lastProductRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleProducts((prev) => {
          return prev + 5;
        });
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div className="product-list">
      {loading && products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="product-container">
          {products.map((product, index) => (
            <div key={product.id} className="product-card">
              <h3 className="product-title">{product.title}</h3>
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
              </Link>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      )}
      <div ref={lastProductRef}></div>
    </div>
  );
};

export default ProductList;
