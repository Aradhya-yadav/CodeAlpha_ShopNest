import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <h1>ShopNest</h1>
          <div className="hero-badges">
  <span>🚚 Fast Delivery</span>
  <span>🔒 Secure Payment</span>
  <span>⭐ Premium Quality</span>
</div>

          <p>
            Access your account, manage orders,
            track deliveries and enjoy premium shopping.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="shopping"
          />
        </div>

        <div className="login-right">

          <form onSubmit={handleSubmit}>

           <h2>
  Welcome Back 👋
</h2>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <span
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            <p className="register-link">
              Don't have an account?
              <Link to="/register">
                {" "}Register
              </Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Login;