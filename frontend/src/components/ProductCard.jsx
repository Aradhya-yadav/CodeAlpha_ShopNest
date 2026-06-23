import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  FaHeart,
  FaStar,
} from "react-icons/fa";
import "../styles/product.css";

const ProductCard = ({
  product,
}) => {

  const dispatch =
    useDispatch();

  const addProductToCart =
    () => {

      dispatch(
        addToCart({
          productId:
            product._id,

          name:
            product.name,

          price:
            product.price,

          imageUrl:
            product.imageUrl,

          qty: 1,
        })
      );

      alert(
        `${product.name} added to cart 🛒`
      );
    };

  return (
    <div className="product-card">

      {/* IMAGE */}

      <div className="product-image-container">

        <img
          src={
            product.imageUrl
          }
          alt={
            product.name
          }
          className="product-image"
        />

        <span className="sale-badge">
          🔥 SALE
        </span>

        <button className="wishlist-btn">
          <FaHeart />
        </button>

      </div>

      {/* INFO */}

      <div className="product-info">

        <span className="category-tag">
          {
            product.category
          }
        </span>

        <h3>
          {product.name}
        </h3>

        <p className="product-desc">
          {product
            .description
            ?.slice(
              0,
              70
            )}
          ...
        </p>

        <div className="rating">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span>
            (
            {product.ratings ||
              4.8}
            )
          </span>

        </div>

        <p className="price">
          ₹
          {product.price}
        </p>

        <div className="stock">

          {product.stock >
          0
            ? "✅ In Stock"
            : "❌ Out Of Stock"}

        </div>

        <div className="product-actions">

          <button
            onClick={
              addProductToCart
            }
            className="cart-btn"
          >
            🛒 Add To Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="details-btn"
          >
            View →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;