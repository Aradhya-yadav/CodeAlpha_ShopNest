import React from "react";
import "../styles/policy.css";

const Disclaimer = () => {
  return (
    <div className="policy-page">

      <div className="policy-card">

        <div className="policy-badge">
          📌 Legal Information
        </div>

        <h1>Disclaimer</h1>

        <p className="policy-intro">
          ShopNest is a modern e-commerce demonstration platform
          created to showcase full-stack web development,
          UI/UX design, payment integration, and database management.
        </p>

        <div className="policy-section">
          <h3>🛍️ Product Information</h3>

          <p>
            Product names, descriptions, pricing, and images
            displayed on this platform may be used solely
            for demonstration purposes and may not represent
            actual commercial products.
          </p>
        </div>

        <div className="policy-section">
          <h3>💳 Payment Gateway</h3>

          <p>
            During development and testing, sandbox payment
            gateways may be used. No real financial transaction
            is intended unless explicitly stated.
          </p>
        </div>

        <div className="policy-section">
          <h3>🌐 External Links</h3>

          <p>
            This platform may contain references to external
            websites. ShopNest is not responsible for the
            content, policies, or practices of third-party
            services.
          </p>
        </div>

        <div className="policy-section">
          <h3>⚖️ Limitation of Liability</h3>

          <p>
            The creators of ShopNest shall not be held liable
            for any direct, indirect, incidental, or consequential
            damages arising from the use of this application.
          </p>
        </div>

        <div className="policy-section">
          <h3>🎓 Educational Purpose</h3>

          <p>
            This project was developed as part of a Full Stack
            Web Development Internship and Portfolio Showcase.
            It demonstrates React, Node.js, Express, MongoDB,
            Authentication, Payments, and Modern UI Design.
          </p>
        </div>

        <div className="contact-box">

          <p className="support-email">
            📧 support@shopnest.com
          </p>

          <p className="support-email">
            🚀 Internship Project
          </p>

        </div>

      </div>

    </div>
  );
};

export default Disclaimer;