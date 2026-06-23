import React, {
useEffect,
useState,
useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import {
useParams,
useNavigate,
} from "react-router-dom";

const EditProduct = () => {
const { id } =
useParams();

const { user } =
useContext(AuthContext);

const navigate =
useNavigate();

const [formData, setFormData] =
useState({
name: "",
description: "",
price: "",
category: "",
stock: "",
});

const [image, setImage] =
useState(null);

const [preview, setPreview] =
useState(null);

const [loading, setLoading] =
useState(false);

const [fetching, setFetching] =
useState(true);

useEffect(() => {
if (
!user ||
user.role !== "admin"
) {
navigate("/");
return;
}

const fetchProduct =
  async () => {
    try {
      const res =
        await fetch(
          `/api/products/${id}`
        );

      const data =
        await res.json();

      if (res.ok) {
        setFormData({
          name:
            data.name || "",
          description:
            data.description ||
            "",
          price:
            data.price || "",
          category:
            data.category ||
            "",
          stock:
            data.stock || "",
        });

        setPreview(
          data.imageUrl
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

fetchProduct();


}, [
id,
user,
navigate,
]);

if (
!user ||
user.role !== "admin"
) {
return null;
}

const handleSubmit =
async (e) => {
e.preventDefault();

  setLoading(true);

  try {
    const data =
      new FormData();

    data.append(
      "name",
      formData.name
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "price",
      formData.price
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "stock",
      formData.stock
    );

    if (image) {
      data.append(
        "image",
        image
      );
    }

    const res =
      await fetch(
        `/api/products/${id}`,
        {
          method:
            "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: data,
        }
      );

    if (res.ok) {
      alert(
        "✅ Product Updated Successfully"
      );

      navigate(
        "/admin/products"
      );
    } else {
      alert(
        "Update Failed"
      );
    }
  } catch (error) {
    console.error(error);
    alert(
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

if (fetching) {
return (
<div
style={{
textAlign:
"center",
marginTop:
"100px",
}}
>
Loading Product... </div>
);
}

return (
<div
style={{
maxWidth:
"700px",
margin:
"40px auto",
background:
"#18181b",
padding:
"40px",
borderRadius:
"12px",
border:
"1px solid rgba(255,255,255,0.05)",
}}
>
<h2
style={{
color:
"#f97316",
marginBottom:
"20px",
}}
>
Edit Product </h2>


  <form
    onSubmit={
      handleSubmit
    }
    style={{
      display:
        "flex",
      flexDirection:
        "column",
      gap: "15px",
    }}
  >
    <input
      type="text"
      required
      value={
        formData.name
      }
      placeholder="Product Name"
      onChange={(
        e
      ) =>
        setFormData({
          ...formData,
          name:
            e.target
              .value,
        })
      }
      style={
        inputStyle
      }
    />

    <textarea
      rows="4"
      required
      value={
        formData.description
      }
      placeholder="Description"
      onChange={(
        e
      ) =>
        setFormData({
          ...formData,
          description:
            e.target
              .value,
        })
      }
      style={
        inputStyle
      }
    />

    <input
      type="number"
      required
      value={
        formData.price
      }
      placeholder="Price"
      onChange={(
        e
      ) =>
        setFormData({
          ...formData,
          price:
            e.target
              .value,
        })
      }
      style={
        inputStyle
      }
    />

    <select
      value={
        formData.category
      }
      onChange={(
        e
      ) =>
        setFormData({
          ...formData,
          category:
            e.target
              .value,
        })
      }
      style={
        inputStyle
      }
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
      required
      value={
        formData.stock
      }
      placeholder="Stock"
      onChange={(
        e
      ) =>
        setFormData({
          ...formData,
          stock:
            e.target
              .value,
        })
      }
      style={
        inputStyle
      }
    />

    <div
      style={{
        padding:
          "15px",
        border:
          "1px dashed #f97316",
        borderRadius:
          "8px",
      }}
    >
      <label
        style={{
          color:
            "#a1a1aa",
        }}
      >
        Replace Image
        (Optional)
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(
          e
        ) => {
          setImage(
            e.target
              .files[0]
          );

          setPreview(
            URL.createObjectURL(
              e.target
                .files[0]
            )
          );
        }}
        style={{
          color:
            "#fff",
          marginTop:
            "10px",
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width:
              "150px",
            height:
              "150px",
            objectFit:
              "cover",
            marginTop:
              "15px",
            borderRadius:
              "10px",
          }}
        />
      )}
    </div>

    <button
      type="submit"
      disabled={
        loading
      }
      className="btn"
    >
      {loading
        ? "⏳ Updating..."
        : "🚀 Update Product"}
    </button>
  </form>
</div>


);
};

const inputStyle = {
padding: "12px",
background: "#09090b",
border:
"1px solid #27272a",
borderRadius: "6px",
color: "#fff",
fontSize: "15px",
outline: "none",
};

export default EditProduct;
