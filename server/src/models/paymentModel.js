const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  serviceRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceRequest",
    required: true,
  },
  stripeSessionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "AED",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  paidAt: {
    type: Date,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
