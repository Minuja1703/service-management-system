const express = require("express");
const router = express.Router();
const {
  verifyProvider,
  getadminDashboardStats,
} = require("../controllers/adminController");
const protect = require("../middlewares/authMiddleware");
const authorizeroles = require("../middlewares/roleMiddleware");

router.patch(
  "/verifyProvider/:id",
  protect,
  authorizeroles("admin"),
  verifyProvider
);
router.get(
  "/me/dashboard",
  protect,
  authorizeroles("admin"),
  getadminDashboardStats
);

module.exports = router;
