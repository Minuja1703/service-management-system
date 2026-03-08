const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceRequestRoute = require("./routes/serviceRequestRoute");
const adminRoutes = require("./routes/adminRoutes");
const providerRoutes = require("./routes/providerRoutes");
const clientRoutes = require("./routes/clientRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const handleErrors = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/service/", serviceRoutes);
app.use("/api/v1/service-request/", serviceRequestRoute);
app.use("/api/v1/admin/", adminRoutes);
app.use("/api/v1/provider/", providerRoutes);
app.use("/api/v1/client/", clientRoutes);
app.use("/api/v1/payments/", paymentRoutes);

app.use(handleErrors);

module.exports = app;
