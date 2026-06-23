import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  removeFromCart,
  addToCart,
} from "../redux/cartSlice";

import "../styles/cart.css";

const Cart = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (
    item,
    qty
  ) => {
    if (qty > 0) {
      dispatch(
        addToCart({
          ...item,
          qty,
        })
      );
    }
  };

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.qty,
      0
    );

  return (
    <div className="cart-container">

      {/* HEADER */}

      <div className="cart-header">

        <span className="cart-badge">
          🛒 Shopping Cart
        </span>

        <h1>
          Your Cart
        </h1>

        <p>
          Review your selected
          products before
          checkout.
        </p>

      </div>

      {cartItems.length ===
      0 ? (
        <div className="empty-cart">

          <h2>
            😔 Your Cart Is Empty
          </h2>

          <p>
            Looks like you
            haven't added any
            products yet.
          </p>

          <Link
            to="/shop"
            className="continue-btn"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="cart-layout">

          {/* ITEMS */}

          <div className="cart-items">

            {cartItems.map(
              (item) => (
                <div
                  key={
                    item.productId
                  }
                  className="cart-item"
                >

                  <img
                    src={
                      item.imageUrl
                    }
                    alt={
                      item.name
                    }
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">

                    <h3>
                      {item.name}
                    </h3>

                    <p className="price">
                      ₹
                      {item.price}
                    </p>

                    <div className="qty-controls">

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            item.qty -
                              1
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {
                          item.qty
                        }
                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            item.qty +
                              1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        handleRemove(
                          item.productId
                        )
                      }
                      className="remove-btn"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

          {/* SUMMARY */}

          <div className="cart-summary">
            
           
            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Products
              </span>

              <span>
                {
                  cartItems.length
                }
              </span>
            </div>

            <div className="summary-row">
              <span>
                Total Amount
              </span>

              <span>
                ₹
                {totalPrice.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="secure-info">
              🔒 Secure Payment
              <br />
              🚚 Fast Delivery
              <br />
              ↩️ Easy Returns
            </div>

            <button
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
              className="checkout-btn"
            >
              Proceed To Checkout →
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;