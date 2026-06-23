import React, {
useEffect,
useState,
useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
const { user } =
useContext(AuthContext);

const navigate =
useNavigate();

const [users, setUsers] =
useState([]);

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

const fetchUsers =
  async () => {
    try {
      const res =
        await fetch(
          "/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

      const data =
        await res.json();

      setUsers(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

fetchUsers();


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
style={
containerStyle
}
>
<h2
style={{
color:
"#f97316",
marginBottom:
"20px",
}}
>
User Directory </h2>

  {loading ? (
    <div
      style={{
        textAlign:
          "center",
        padding:
          "40px",
      }}
    >
      Loading Users...
    </div>
  ) : (
    <div
      style={{
        overflowX:
          "auto",
      }}
    >
      <table
        style={
          tableStyle
        }
      >
        <thead>
          <tr
            style={
              rowStyle
            }
          >
            <th
              style={
                thStyle
              }
            >
              ID
            </th>

            <th
              style={
                thStyle
              }
            >
              NAME
            </th>

            <th
              style={
                thStyle
              }
            >
              EMAIL
            </th>

            <th
              style={
                thStyle
              }
            >
              ROLE
            </th>

            <th
              style={
                thStyle
              }
            >
              JOINED
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (u) => (
              <tr
                key={
                  u._id
                }
                style={
                  rowStyle
                }
              >
                <td
                  style={
                    tdStyle
                  }
                >
                  {
                    u._id?.substring(
                      0,
                      8
                    )
                  }
                  ...
                </td>

                <td
                  style={
                    tdStyle
                  }
                >
                  {u.name}
                </td>

                <td
                  style={
                    tdStyle
                  }
                >
                  {u.email}
                </td>

                <td
                  style={
                    tdStyle
                  }
                >
                  <span
                    style={{
                      background:
                        u.role ===
                        "admin"
                          ? "rgba(249,115,22,.2)"
                          : "rgba(16,185,129,.2)",
                      color:
                        u.role ===
                        "admin"
                          ? "#f97316"
                          : "#10b981",
                      padding:
                        "5px 10px",
                      borderRadius:
                        "6px",
                      fontWeight:
                        "600",
                    }}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                <td
                  style={
                    tdStyle
                  }
                >
                  {new Date(
                    u.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )}
</div>


);
};

const containerStyle = {
maxWidth: "1200px",
margin: "40px auto",
padding: "30px",
background: "#18181b",
borderRadius: "12px",
border:
"1px solid rgba(255,255,255,0.05)",
color: "#fafafa",
};

const tableStyle = {
width: "100%",
borderCollapse:
"collapse",
};

const rowStyle = {
borderBottom:
"1px solid rgba(255,255,255,0.08)",
};

const thStyle = {
padding: "15px",
textAlign: "left",
color: "#a1a1aa",
};

const tdStyle = {
padding: "15px",
};

export default AdminUsers;
