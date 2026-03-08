const express = require("express");
const router = express.Router();
const {
  acceptRequest,
  viewProvidersByServiceId,
  getProviderDashboardStats,
} = require("../controllers/providerController");
const protect = require("../middlewares/authMiddleware");
const authorizeroles = require("../middlewares/roleMiddleware");

router.get(
  "/:serviceId/viewProviders",
  protect,
  authorizeroles("client"),
  viewProvidersByServiceId
);
router.patch(
  "/acceptRequest/:id",
  protect,
  authorizeroles("provider"),
  acceptRequest
);

router.get(
  "/me/dashboard",
  protect,
  authorizeroles("provider"),
  getProviderDashboardStats
);

module.exports = router;
