const ServiceRequest = require("../models/serviceRequestModel");
const ProviderProfile = require("../models/providerProfileModel");

const requestService = async (req, res, next) => {
  try {
    const { serviceId, providerId, description, address, scheduledDate } =
      req.body;

    if (
      !serviceId ||
      !providerId ||
      !description ||
      !address ||
      !scheduledDate
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const clientId = req.user.id;

    const providerProfile = await ProviderProfile.findOne({
      userId: providerId,
    });
    const price = providerProfile.price;

    const newServiceRequest = new ServiceRequest({
      clientId,
      providerId,
      serviceId,
      description,
      address,
      scheduledDate,
      totalAmount: price,
    });

    await newServiceRequest.save();

    res.status(201).json({
      message:
        "Service request has been sent. Provider will respond to you shortly.",
    });
  } catch (error) {
    next(error);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateStatus = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updateStatus) {
      return res.status(404).json({
        message: "Status Request not found.",
      });
    }

    res.status(200).json({
      message: "Status updated successfully..",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { requestService, updateRequestStatus };
