import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
const { user } = useContext(AuthContext);
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
description: "",
price: "",
category: "",
stock: "",
});

const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
if (!user || user.role !== "admin") {
navigate("/");
}
}, [user, navigate]);

if (!user || user.role !== "admin") {
return null;
}

const handleSubmit = async (e) => {
e.preventDefault();

if (!image) {
  return alert("Please select an image");
}

setLoading(true);

const data = new FormData();

data.append("name", formData.name);
data.append("description", formData.description);
data.append("price", formData.price);
data.append("category", formData.category);
data.append("stock", formData.stock);
data.append("image", image);

try {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: data,
  });

  const responseData = await res.json();

  if (res.ok) {
    alert("✅ Product Created Successfully!");

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });

    setImage(null);
    setPreview(null);

    navigate("/shop");
  } else {
    alert(
      responseData.message ||
        "Error Creating Product"
    );
  }
} catch (error) {
  console.error(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}

};

return (
<div
style={{
maxWidth: "700px",
margin: "40px auto",
background: "#18181b",
padding: "40px",
borderRadius: "15px",
border:
"1px solid rgba(255,255,255,0.08)",
}}
>
<h2
style={{
color: "#f97316",
marginBottom: "25px",
textAlign: "center",
}}
>
Add New Product </h2>

  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <input
      type="text"
      placeholder="Product Name"
      required
      value={formData.name}
      onChange={(e) =>
        setFormData({
          ...formData,
          name: e.target.value,
        })
      }
      style={inputStyle}
    />

    <textarea
      rows="4"
      placeholder="Description"
      required
      value={formData.description}
      onChange={(e) =>
        setFormData({
          ...formData,
          description: e.target.value,
        })
      }
      style={inputStyle}
    />

    <input
      type="number"
      placeholder="Price"
      required
      value={formData.price}
      onChange={(e) =>
        setFormData({
          ...formData,
          price: e.target.value,
        })
      }
      style={inputStyle}
    />

    <select
      required
      value={formData.category}
      onChange={(e) =>
        setFormData({
          ...formData,
          category: e.target.value,
        })
      }
      style={inputStyle}
    >
      <option value="">
        Select Category
      </option>
      <option value="Electronics">
        Electronics
      </option>
      <option value="Fashion">
        Fashion
      </option>
      <option value="Footwear">
        Footwear
      </option>
      <option value="Accessories">
        Accessories
      </option>
    </select>

    <input
      type="number"
      placeholder="Stock Quantity"
      required
      value={formData.stock}
      onChange={(e) =>
        setFormData({
          ...formData,
          stock: e.target.value,
        })
      }
      style={inputStyle}
    />

    <div
      style={{
        padding: "15px",
        border:
          "1px dashed #f97316",
        borderRadius: "10px",
      }}
    >
      <label
        style={{
          color: "#a1a1aa",
          display: "block",
          marginBottom: "10px",
        }}
      >
        Upload Product Image
      </label>

      <input
        type="file"
        accept="image/*"
        required
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(
            URL.createObjectURL(
              e.target.files[0]
            )
          );
        }}
        style={{
          color: "#fff",
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        />
      )}
    </div>

    <button
      type="submit"
      disabled={loading}
      className="btn"
      style={{
        marginTop: "10px",
      }}
    >
      {loading
        ? "⏳ Uploading..."
        : "🚀 Publish Product"}
    </button>
  </form>
</div>

);
};

const inputStyle = {
padding: "12px",
background: "#09090b",
border: "1px solid #27272a",
borderRadius: "8px",
color: "#fff",
fontSize: "15px",
outline: "none",
};

export default AddProduct;
