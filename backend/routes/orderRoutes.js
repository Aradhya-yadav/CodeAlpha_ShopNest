const express = require("express");

const {
addOrderItems,
getMyOrders,
getOrders,
updateOrderStatus,
} = require("../controllers/orderController");

const {
protect,
} = require("../middleware/authMiddleware");

const {
admin,
} = require("../middleware/adminMiddleware");

const router =
express.Router();

/*
Customer Routes
*/

router.post(
"/",
protect,
addOrderItems
);

router.get(
"/myorders",
protect,
getMyOrders
);

/*
Admin Routes
*/

router.get(
"/",
protect,
admin,
getOrders
);

router.put(
"/:id/status",
protect,
admin,
updateOrderStatus
);

module.exports =
router;
