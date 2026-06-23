import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          "Registration Successful! Welcome to ShopNest 🎉"
        );

        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-left">
          <h1>Join ShopNest 🚀</h1>
          <div className="hero-badges">
  <span>🚚 Free Delivery</span>
  <span>🔒 Secure Payment</span>
  <span>⭐ Premium Quality</span>
</div>

          <p>
            Create your account and start shopping premium
            products with exclusive deals.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="register"
          />
        </div>

        <div className="login-right">

          <form onSubmit={handleSubmit}>

            <h2>Create Account</h2>

            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

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
    placeholder="Create Password"
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
            >
              Create Account
            </button>

            <p className="register-link">
              Already have an account?
              <Link to="/login">
                {" "}Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;