const Order =
require("../models/Order");

const Product =
require("../models/Product");

const User =
require("../models/User");

const getAdminStats =
async (
req,
res
) => {
try {
const [
totalOrders,
totalProducts,
totalUsers,
orders,
] =
await Promise.all([
Order.countDocuments(),
Product.countDocuments(),
User.countDocuments({
role:
"user",
}),
Order.find({}),
]);


  const totalRevenue =
    orders.reduce(
      (
        acc,
        order
      ) =>
        acc +
        order.totalAmount,
      0
    );

  res.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
  });
} catch (
  error
) {
  res.status(500).json({
    success:
      false,
    message:
      error.message,
  });
}


};

module.exports = {
getAdminStats,
};
