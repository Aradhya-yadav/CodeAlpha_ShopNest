import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-card">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className="role-badge">
              {user.role}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>
            ₹
            {orders.reduce(
              (sum, item) =>
                sum + item.totalAmount,
              0
            )}
          </h2>
          <p>Total Spending</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              orders.filter(
                (o) =>
                  o.status ===
                  "Delivered"
              ).length
            }
          </h2>
          <p>Delivered</p>
      </div>
      <div className="stat-card">
  <h2>{user.role}</h2>
  <p>Account Type</p>
</div>
</div>
      <div className="orders-section">

        <h2>My Orders</h2>

        {loading ? (
          <p>Loading Orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-orders">

            <h3>
              No Orders Yet
            </h3>

            <Link
              to="/shop"
              className="shop-btn"
            >
              Start Shopping
            </Link>

          </div>
        ) : (
          <div className="orders-grid">

            {orders.map((order) => (
              <div
                key={order._id}
                className="order-card"
              >
                <h4>
                  Order #
                  {order._id.slice(
                    -6
                  )}
                </h4>

                <p>
                  Date:
                  {" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  Amount:
                  {" "}
                  ₹
                  {order.totalAmount}
                </p>

                <span
                  className={`status ${order.status}`}
                >
                  {order.status}
                </span>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Profile;