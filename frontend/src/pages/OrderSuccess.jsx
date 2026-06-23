import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="success-page">
      <div className="success-card">
         <div className="success-badge">
  Payment Verified ✓
</div>
        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully 🎉</h1>

        <p>
          Thank you for shopping with ShopNest.
          Your payment has been received and your order is now being processed.
        </p>

        <div className="order-info">
          <div>
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>3-5 Days</strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>Successful</strong>
          </div>
        </div>

        <div className="success-buttons">
          <Link to="/profile" className="track-btn">
            View Orders
          </Link>

          <Link to="/shop" className="shop-btn">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;