const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const ProviderProfile = require("../models/providerProfileModel");

const verifyProvider = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userUpdate = await User.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "Provider is Approved.",
    });
  } catch (error) {
    next(error);
  }
};

const getadminDashboardStats = async (req, res, next) => {
  try {
    const pendingProviders = await User.countDocuments({
      role: "provider",
      isVerified: false,
    });

    const totalServices = await Service.countDocuments();

    const totalProviders = await User.countDocuments({
      role: "provider",
    });

    const providerRequests = await ProviderProfile.find()
      .select("price serviceOfferedId experienceYears serviceAreas")
      .populate({
        path: "userId",
        select: "name email phone",
        match: { isVerified: false },
      })
      .populate("serviceOfferedId", "name description");

    const filteredProviderRequests = providerRequests.filter(
      (p) => p.userId !== null
    );

    res.status(200).json({
      pendingProviders,
      totalServices,
      totalProviders,
      filteredProviderRequests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyProvider, getadminDashboardStats };
