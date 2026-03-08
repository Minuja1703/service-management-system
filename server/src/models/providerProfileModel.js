const mongoose = require("mongoose");

const providerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  serviceOfferedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  serviceAreas: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
});

const ProviderProfile = mongoose.model(
  "ProviderProfile",
  providerProfileSchema
);

module.exports = ProviderProfile;
