import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <h2>
            🛍️ ShopNest
          </h2>

          <p>
            Premium E-Commerce Platform
            built using React, Node.js,
            Express and MongoDB.
          </p>

          <div className="footer-social">

            <a
              href="https://github.com/Aradhya-yadav"
              target="_blank"
              rel="noreferrer"
            >
              💻 GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aradhya-yadav-645910373"
              target="_blank"
              rel="noreferrer"
            >
              💼 LinkedIn
            </a>

          </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-links">

          <h4>Quick Links</h4>

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/profile">
            Profile
          </Link>
          

        </div>

        {/* POLICIES */}

        <div className="footer-links">

          <h4>Policies</h4>

          <Link to="/return">
            Return Policy
          </Link>

          <Link to="/disclaimer">
            Disclaimer
          </Link>

        </div>

        {/* DEVELOPER */}

        <div className="footer-contact">

          <h4>Developer</h4>

          <p>
            Aradhya Yadav
          </p>

          <p>
            Full Stack Developer &
            Data Science Enthusiast
          </p>

          <a
            href="mailto:your-email@gmail.com"
          >
            📧 Contact Me
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()}
        {" "}
        ShopNest |
        Developed by
        {" "}
        Aradhya Yadav 🚀

      </div>

    </footer>
  );
};

export default Footer;