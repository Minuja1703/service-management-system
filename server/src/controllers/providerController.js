const ServiceRequest = require("../models/serviceRequestModel");
const ProviderProfile = require("../models/providerProfileModel");

const acceptRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const serviceRequestUpdate = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );

    if (!serviceRequestUpdate) {
      return res.status(404).json({
        message: "Service Request not found.",
      });
    }

    res.status(200).json({
      message: "Provider accepted the service.",
    });
  } catch (error) {
    next(error);
  }
};

const viewProvidersByServiceId = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const providers = await ProviderProfile.find({
      serviceOfferedId: serviceId,
      availability: true,
    }).populate("userId", "name phone");

    if (!providers) {
      return res.status(404).json({
        message: "Provider not found.",
      });
    }

    res.status(200).json(providers);
  } catch (error) {
    next(error);
  }
};

const getProviderDashboardStats = async (req, res, next) => {
  try {
    const providerUserId = req.user.id;

    const totalRequests = await ServiceRequest.countDocuments({
      providerId: providerUserId,
    });

    const pendingRequests = await ServiceRequest.countDocuments({
      providerId: providerUserId,
      status: "Pending",
    });

    const completedRequests = await ServiceRequest.countDocuments({
      providerId: providerUserId,
      status: "Completed",
    });

    const requests = await ServiceRequest.find({
      providerId: providerUserId,
    }).populate("clientId", "name");

    const providerProfile = await ProviderProfile.findOne({
      userId: providerUserId,
    }).populate("serviceOfferedId", "name");

    const totalEarnings = providerProfile.totalEarnings;

    res.status(200).json({
      totalRequests,
      pendingRequests,
      completedRequests,
      requests,
      providerProfile,
      totalEarnings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  acceptRequest,
  viewProvidersByServiceId,
  getProviderDashboardStats,
};
