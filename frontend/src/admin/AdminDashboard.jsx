import React, {
useEffect,
useState,
useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
const { user } =
useContext(AuthContext);

const navigate =
useNavigate();

const [stats, setStats] =
useState(null);

const [loading, setLoading] =
useState(true);

useEffect(() => {
if (
!user ||
user.role !== "admin"
) {
navigate("/");
return;
}

const fetchStats =
  async () => {
    try {
      const res =
        await fetch(
          "/api/analytics",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

      const data =
        await res.json();

      if (res.ok) {
        setStats(data);
      } else {
        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0,
        });

        if (
          res.status === 401
        ) {
          navigate(
            "/login"
          );
        }
      }
    } catch (error) {
      console.error(
        error
      );

      setStats({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0,
      });
    } finally {
      setLoading(false);
    }
  };

fetchStats();

}, [
user,
navigate,
]);

if (
!user ||
user.role !== "admin"
) {
return null;
}

return (
<div
style={{
maxWidth:
"1200px",
margin:
"30px auto",
padding:
"20px",
}}
>
<div
style={{
display: "flex",
alignItems:
"center",
gap: "15px",
marginBottom:
"10px",
}}
>
<img
src="/ShopNestLogo.png"
alt="Logo"
style={{
width: "50px",
height: "50px",
borderRadius:
"10px",
}}
/>

    <div>
      <h1
        style={{
          margin: 0,
        }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          color:
            "#888",
        }}
      >
        Welcome,
        {" "}
        {user.name}
      </p>
    </div>
  </div>

  {loading ? (
    <div
      style={{
        textAlign:
          "center",
        marginTop:
          "80px",
      }}
    >
      Loading Dashboard...
    </div>
  ) : (
    <>
      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap:
            "20px",
          marginTop:
            "30px",
        }}
      >
        <DashboardCard
          title="Orders"
          value={
            stats?.totalOrders ||
            0
          }
        />

        <DashboardCard
          title="Products"
          value={
            stats?.totalProducts ||
            0
          }
        />

        <DashboardCard
          title="Users"
          value={
            stats?.totalUsers ||
            0
          }
        />

        <DashboardCard
          title="Revenue"
          value={`₹${(
            stats?.totalRevenue ||
            0
          ).toFixed(2)}`}
        />
      </div>

      <div
        style={{
          marginTop:
            "40px",
          background:
            "#18181b",
          padding:
            "25px",
          borderRadius:
            "15px",
        }}
      >
        <h2
          style={{
            marginBottom:
              "20px",
          }}
        >
          Administrative Controls
        </h2>

        <div
          style={{
            display:
              "flex",
            flexWrap:
              "wrap",
            gap:
              "15px",
          }}
        >
          <button
            className="btn"
            onClick={() =>
              navigate(
                "/admin/add-product"
              )
            }
          >
            ➕ Add Product
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            📦 Products
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
          >
            🚚 Orders
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate(
                "/admin/users"
              )
            }
          >
            👥 Users
          </button>
        </div>
      </div>
    </>
  )}
</div>

);
};

const DashboardCard = ({
title,
value,
}) => {
return (
<div
style={{
background:
"#18181b",
padding:
"25px",
borderRadius:
"15px",
textAlign:
"center",
border:
"1px solid rgba(255,255,255,0.05)",
}}
>
<h3
style={{
color:
"#a1a1aa",
}}
>
{title} </h3>

  <div
    style={{
      fontSize:
        "2rem",
      fontWeight:
        "700",
      color:
        "#f97316",
      marginTop:
        "10px",
    }}
  >
    {value}
  </div>
</div>

);
};

export default AdminDashboard;
