import React from "react";
import "../styles/policy.css";

const ReturnPolicy = () => {
  return (
    <div className="policy-page">

      <div className="policy-card">

        <h1>Return & Refund Policy</h1>
        <div className="policy-badge">
  ✅ 30 Days Easy Return Guarantee
</div>

        <p className="policy-intro">
          At ShopNest, customer satisfaction is our top priority.
          If you are not completely satisfied with your purchase,
          you may request a return within 30 days of delivery.
        </p>

        <div className="policy-section">
          <h3>1. Return Eligibility</h3>

          <p>
            Products must be unused, in their original condition,
            and returned with all packaging, accessories,
            and proof of purchase.
          </p>
        </div>

        <div className="policy-section">
          <h3>2. Refund Process</h3>

          <p>
            Once we receive and inspect the returned item,
            refunds will be processed to the original payment
            method within 5-7 business days.
          </p>
        </div>

        <div className="policy-section">
          <h3>3. Non-Returnable Items</h3>

          <p>
            Digital products, software licenses, gift cards,
            personalized items, and damaged products caused by misuse
            are not eligible for returns.
          </p>
        </div>

        <div className="policy-section">
          <h3>4. Shipping Charges</h3>

          <p>
            Return shipping costs are the responsibility of the customer
            unless the return is due to a defective or incorrect item.
          </p>
        </div>

        <div className="policy-section">
          <h3>5. Contact Support</h3>

          <p>
            For return requests or refund-related questions,
            contact our support team at:
          </p>

         <div className="contact-box">
  <p className="support-email">
    📧 support@shopnest.com
  </p>

  <p className="support-email">
    📞 +91 98765 43223
  </p>
</div>
        </div>

      </div>

    </div>
  );
};

export default ReturnPolicy;