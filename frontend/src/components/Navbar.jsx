import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import "../styles/navbar.css";

const Navbar = () => {

  const { user, logout } =
    useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const navigate = useNavigate();

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + item.qty,
      0
    );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div className="navbar-brand">

        <Link
          to="/"
          className="brand-link"
        >

          <img
            src="/ShopNestLogo.png"
            alt="ShopNest"
            className="logo"
          />

          <span>
            ShopNest
          </span>

        </Link>

      </div>

      {/* NAV LINKS */}

      <ul className="navbar-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/shop">
            Shop
          </Link>
        </li>

        <li>
          <Link to="/about">
            About
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="cart-link"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}

          </Link>
        </li>

      </ul>

      {/* RIGHT SIDE */}

      <div className="navbar-actions">

        {user ? (
          <>

            <Link
              to="/profile"
              className="profile-btn"
            >
              👋 {user.name}
            </Link>

            {user.role ===
              "admin" && (
              <Link
                to="/admin"
                className="admin-btn"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              Logout
            </button>

          </>
        ) : (
          <>

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Register
            </Link>

          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;