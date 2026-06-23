import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import '../styles/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (

    // hero section
    <div className="home">

     <section className="hero">

  <div className="hero-glow"></div>

  <div className="hero-content">

    <h1>
      Discover The Future Of
      <span className="gradient-text">
        {" "}Online Shopping
      </span>
    </h1>

    <p>
  Experience luxury shopping with premium products,
  lightning-fast delivery, secure payments and
  unbeatable prices.
</p>

    <div className="hero-badges">
      <span>🚚 Free Delivery</span>
      <span>🔒 Secure Payment</span>
      <span>⭐ Premium Quality</span>
    </div>

    <div className="hero-buttons">
      <Link to="/shop" className="btn-primary">
        Shop Now
      </Link>

      <Link to="/about" className="btn-secondary">
        Learn More
      </Link>
    </div>

  </div>

  <div className="hero-image">
    <img
     src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
      alt="banner"
    />
    <div className="floating-card">
  ⭐ Rated 4.9/5 By 10K+ Customers
</div>
  </div>

</section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>Satisfaction</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Support</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-grid">
          <div className="category-card">
  <span>📱</span>
  <h3>Electronics</h3>
</div>

<div className="category-card">
  <span>👕</span>
  <h3>Fashion</h3>
</div>

<div className="category-card">
  <span>👟</span>
  <h3>Footwear</h3>
</div>

<div className="category-card">
  <span>⌚</span>
  <h3>Accessories</h3>
</div>
        </div>
      </section>
       
       

      {/* FEATURED PRODUCTS */}
      <section className="featured">

  <div className="featured-header">
    <div>
      <span className="featured-tag">
        🔥 Best Sellers
      </span>

      <h2>Featured Products</h2>

      <p>
        Explore our most popular and trending products.
      </p>
    </div>

    <Link to="/shop" className="view-all-btn">
      View All →
    </Link>
  </div>

  {loading ? (
    <div className="loader">
      Loading Products...
    </div>
  ) : (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  )}

</section>
    </div>
  );
};

export default Home;