const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const authorizeroles = require("../middlewares/roleMiddleware");
const getClientDashboardStats = require("../controllers/clientController");

router.get("/me/dashboard", protect, authorizeroles("client"), getClientDashboardStats);

module.exports = router;
