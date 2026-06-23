const express = require("express");

const {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct,
} = require("../controllers/productController");

const {
protect,
} = require("../middleware/authMiddleware");

const {
admin,
} = require("../middleware/adminMiddleware");

const multer =
require("multer");

const storage =
multer.diskStorage({
destination: (
req,
file,
cb
) => {
cb(
null,
"uploads/"
);
},


filename: (
  req,
  file,
  cb
) => {
  cb(
    null,
    `${Date.now()}-${file.originalname}`
  );
},


});

const fileFilter = (
req,
file,
cb
) => {
if (
file.mimetype.startsWith(
"image"
)
) {
cb(null, true);
} else {
cb(
new Error(
"Only image files are allowed"
),
false
);
}
};

const upload =
multer({
storage,
limits: {
fileSize:
5 * 1024 * 1024,
},
fileFilter,
});

const router =
express.Router();

/* Public Routes */

router
.route("/")
.get(getProducts);

/* Admin Routes */

router
.route("/")
.post(
protect,
admin,
upload.single(
"image"
),
createProduct
);

router
.route("/:id")
.get(
getProductById
)
.put(
protect,
admin,
upload.single(
"image"
),
updateProduct
)
.delete(
protect,
admin,
deleteProduct
);

module.exports =
router;
