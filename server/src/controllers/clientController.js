const ServiceRequest = require("../models/serviceRequestModel");
const User = require("../models/userModel");

const getClientDashboardStats = async (req, res, next) => {
  try {
    const clientId = req.user.id;

    const totalReqCount = await ServiceRequest.countDocuments({ clientId });
    const completedReqCount = await ServiceRequest.countDocuments({
      clientId,
      status: "Completed",
    });
    const pendingReqCount = await ServiceRequest.countDocuments({
      clientId,
      status: "Pending",
    });

    const client = await User.findById(clientId).select("name");

    const clientReqests = await ServiceRequest.find({ clientId })
      .select("id serviceId scheduledDate status totalAmount paymentStatus")
      .populate("serviceId", "name");

    const formattedClientReqs = clientReqests.map((req) => ({
      serviceReqId: req.id,
      serviceName: req.serviceId.name,
      ServiceDate: req.scheduledDate,
      serviceStatus: req.status,
      totalAmount: req.totalAmount,
      paymentStatus: req.paymentStatus,
    }));

    res.status(200).json({
      total: totalReqCount,
      completed: completedReqCount,
      pending: pendingReqCount,
      clientName: client.name,
      clientReqs: formattedClientReqs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getClientDashboardStats;
