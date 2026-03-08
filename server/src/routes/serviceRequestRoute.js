const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const authorizeroles = require("../middlewares/roleMiddleware");
const {
  requestService,
  updateRequestStatus,
} = require("../controllers/serviceRequestController");

router.post("/", protect, authorizeroles("client"), requestService);
router.patch(
  "/:id/status",
  protect,
  authorizeroles("provider"),
  updateRequestStatus
);

module.exports = router;
