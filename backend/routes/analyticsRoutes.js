const express = require("express");

const {
  getAdminStats,
} = require("../controllers/analyticsController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

const router =
  express.Router();

/*
  Admin Analytics
*/

router.get(
  "/",
  protect,
  admin,
  getAdminStats
);

module.exports =
  router;