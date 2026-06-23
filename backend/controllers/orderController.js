const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

/* =========================
Create New Order
========================= */

const addOrderItems =
async (
req,
res
) => {
try {
const {
items,
totalAmount,
address,
paymentId,
} = req.body;

  if (
    !items ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "No order items",
      });
  }

  if (
    !totalAmount ||
    totalAmount <= 0
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "Invalid order amount",
      });
  }

  const order =
    new Order({
      userId:
        req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
      isPaid: true,
      paidAt:
        new Date(),
    });

  const createdOrder =
    await order.save();

  /* =========================
     Send Email
  ========================= */

  const message =
    `
    <h2>Order Confirmation</h2>

    <p>Hello ${req.user.name},</p>

    <p>
      Your order has been successfully placed.
    </p>

    <p>
      <strong>Order ID:</strong>
      ${createdOrder._id}
    </p>

    <p>
      <strong>Total Amount:</strong>
      ₹${Number(
        totalAmount
      ).toFixed(2)}
    </p>

    <p>
      <strong>Shipping Address:</strong>
      ${address.street},
      ${address.city},
      ${address.country}
    </p>

    <p>
      Thank you for shopping with
      ShopNest ❤️
    </p>
  `;

  try {
    await sendEmail({
      email:
        req.user.email,
      subject:
        "ShopNest - Order Confirmation",
      message,
    });
  } catch (
    emailError
  ) {
    console.log(
      "Email Error:",
      emailError.message
    );
  }

  return res
    .status(201)
    .json(
      createdOrder
    );
} catch (error) {
  return res
    .status(500)
    .json({
      success:
        false,
      message:
        error.message,
    });
}
};

/* =========================
Get Logged User Orders
========================= */

const getMyOrders =
async (
req,
res
) => {
try {
const orders =
await Order.find({
userId:
req.user._id,
}).sort({
createdAt: -1,
});


  res.json(
    orders
  );
} catch (error) {
  res.status(500).json({
    success:
      false,
    message:
      error.message,
  });
}


};

/* =========================
Admin Get All Orders
========================= */

const getOrders =
async (
req,
res
) => {
try {
const orders =
await Order.find({})
.populate(
"userId",
"name email"
)
.sort({
createdAt: -1,
});


  res.json(
    orders
  );
} catch (error) {
  res.status(500).json({
    success:
      false,
    message:
      error.message,
  });
}

};

/* =========================
Update Order Status
========================= */

const updateOrderStatus =
async (
req,
res
) => {
try {
const order =
await Order.findById(
req.params.id
);

  if (
    !order
  ) {
    return res
      .status(404)
      .json({
        success:
          false,
        message:
          "Order not found",
      });
  }

  const allowedStatus =
    [
      "Pending",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

  if (
    !allowedStatus.includes(
      req.body.status
    )
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "Invalid status",
      });
  }

  order.status =
    req.body.status;

  const updatedOrder =
    await order.save();

  res.json(
    updatedOrder
  );
} catch (error) {
  res.status(500).json({
    success:
      false,
    message:
      error.message,
  });
}

};

module.exports = {
addOrderItems,
getMyOrders,
getOrders,
updateOrderStatus,
};
