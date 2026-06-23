import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    // Search
    if (search) {
      temp = temp.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      temp = temp.filter(
        (item) =>
          item.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Sorting
    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [search, category, sort, products]);

  return (
    <div className="shop-page">

      {/* HEADER */}
      <section className="shop-offer-banner">
        <h2>🔥 Summer Sale - Up To 50% OFF</h2>
        <p>
          Limited time deals on selected products
        </p>
      </section>

      <div className="shop-header">

        <span className="shop-badge">
          🔥 Trending Collection
        </span>

        <h1>
          Discover Amazing
          <span className="gradient-text">
            {" "}Products
          </span>
        </h1>

        <p>
          Handpicked premium products with
          fast delivery and secure checkout.
        </p>

      </div>

      {/* QUICK CATEGORIES */}
      <div className="quick-categories">

        <button onClick={() => setCategory("All")}>
          All
        </button>

        <button onClick={() => setCategory("Electronics")}>
          📱 Electronics
        </button>

        <button onClick={() => setCategory("Fashion")}>
          👕 Fashion
        </button>

        <button onClick={() => setCategory("Footwear")}>
          👟 Footwear
        </button>

        <button onClick={() => setCategory("Accessories")}>
          ⌚ Accessories
        </button>

      </div>

      {/* SEARCH + FILTER */}
      <div className="shop-controls">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="category-select"
        >
          {[
            "All",
            ...new Set(
              products.map(
                (item) => item.category
              )
            ),
          ].map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="category-select"
        >
          <option value="default">
            Sort By
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>

      </div>

      {/* COUNT */}
      <div className="product-count">
        📦 {filteredProducts.length} Products Available
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="loading">
          Loading Products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-products">
          <h2>😔 No Products Found</h2>
          <p>
            Try another category or search keyword.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Shop;