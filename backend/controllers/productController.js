const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

/* =========================
Get All Products
========================= */

const getProducts = async (
req,
res
) => {
try {
const products =
await Product.find({})
.sort({
createdAt: -1,
});


res.json(products);


} catch (error) {
res.status(500).json({
success: false,
message:
error.message,
});
}
};

/* =========================
Get Product By ID
========================= */

const getProductById =
async (
req,
res
) => {
try {
const product =
await Product.findById(
req.params.id
);


  if (!product) {
    return res
      .status(404)
      .json({
        success:
          false,
        message:
          "Product not found",
      });
  }

  res.json(product);
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

/* =========================
Create Product
========================= */

const createProduct =
async (
req,
res
) => {
try {
const {
name,
description,
price,
category,
stock,
} = req.body;


  if (
    !name ||
    !description ||
    !price ||
    !category
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "All fields are required",
      });
  }

  let imageUrl =
    "";

  if (
    req.file
  ) {
    const result =
      await cloudinary.uploader.upload(
        req.file
          .path
      );

    imageUrl =
      result.secure_url;

    fs.unlinkSync(
      req.file
        .path
    );
  }

  const product =
    new Product({
      name,
      description,
      price,
      category,
      stock:
        stock || 0,
      imageUrl,
    });

  const createdProduct =
    await product.save();

  res
    .status(201)
    .json(
      createdProduct
    );
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

/* =========================
Update Product
========================= */

const updateProduct =
async (
req,
res
) => {
try {
const {
name,
description,
price,
category,
stock,
} = req.body;


  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {
    return res
      .status(404)
      .json({
        success:
          false,
        message:
          "Product not found",
      });
  }

  product.name =
    name ??
    product.name;

  product.description =
    description ??
    product.description;

  product.price =
    price ??
    product.price;

  product.category =
    category ??
    product.category;

  product.stock =
    stock ??
    product.stock;

  if (
    req.file
  ) {
    const result =
      await cloudinary.uploader.upload(
        req.file
          .path
      );

    product.imageUrl =
      result.secure_url;

    fs.unlinkSync(
      req.file
        .path
    );
  }

  const updatedProduct =
    await product.save();

  res.json(
    updatedProduct
  );
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

/* =========================
Delete Product
========================= */

const deleteProduct =
async (
req,
res
) => {
try {
const product =
await Product.findById(
req.params.id
);


  if (!product) {
    return res
      .status(404)
      .json({
        success:
          false,
        message:
          "Product not found",
      });
  }

  await product.deleteOne();

  res.json({
    success: true,
    message:
      "Product deleted successfully",
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}

};

module.exports = {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct,
};
