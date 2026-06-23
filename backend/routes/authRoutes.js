const express = require("express");

const {
registerUser,
loginUser,
getUsers,
} = require("../controllers/authController");

const {
protect,
} = require("../middleware/authMiddleware");

const {
admin,
} = require("../middleware/adminMiddleware");

const router =
express.Router();

/*
Public Routes
*/

router.post(
"/register",
registerUser
);

router.post(
"/login",
loginUser
);

/*
Admin Routes
*/

router.get(
"/users",
protect,
admin,
getUsers
);

module.exports =
router;
