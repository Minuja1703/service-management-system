const express = require("express");
const router = express.Router();
const {addService, viewAllServices} = require("../controllers/serviceController");
const protect = require("../middlewares/authMiddleware");
const authorizeroles = require("../middlewares/roleMiddleware");

router.post("/", protect, authorizeroles("admin"), addService);
router.get("/", viewAllServices);

module.exports = router;
