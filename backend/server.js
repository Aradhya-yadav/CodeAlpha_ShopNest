const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

/* =========================
Middleware
========================= */

const allowedOrigins = [
"http://localhost:5000",
"http://127.0.0.1:5000",
];

if (process.env.FRONTEND_URL) {
allowedOrigins.push(
process.env.FRONTEND_URL
);
}

app.use(
cors({
origin: allowedOrigins,
credentials: true,
})
);

app.use(
express.json({
limit: "10mb",
})
);

app.use(
express.urlencoded({
extended: true,
limit: "10mb",
})
);

/* =========================
Routes
========================= */

app.get("/", (req, res) => {
res.json({
success: true,
message:
"ShopNest API Running Successfully 🚀",
});
});

app.use(
"/api/auth",
require("./routes/authRoutes")
);

app.use(
"/api/products",
require("./routes/productRoutes")
);

app.use(
"/api/orders",
require("./routes/orderRoutes")
);

app.use(
"/api/payment",
require("./routes/paymentRoutes")
);

app.use(
"/api/analytics",
require("./routes/analyticsRoutes")
);

/* =========================
Production Frontend
========================= */

if (
process.env.NODE_ENV ===
"production"
) {
app.use(
express.static(
path.join(
__dirname,
"../frontend/build"
)
)
);

app.get("*", (req, res) => {
res.sendFile(
path.resolve(
__dirname,
"../frontend/build",
"index.html"
)
);
});
}

/* =========================
404 Handler
========================= */

app.use((req, res) => {
res.status(404).json({
success: false,
message: "Route Not Found",
});
});

/* =========================
Global Error Handler
========================= */

app.use(
(
err,
req,
res,
next
) => {
console.error(
"Server Error:",
err
);


res.status(500).json({
  success: false,
  message:
    "Internal Server Error",
});

}
);

/* =========================
Server Start
========================= */

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
`🚀 Server Running On Port ${PORT}`
);
});
