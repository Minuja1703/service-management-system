const Service = require("../models/serviceModel");

const addService = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const serviceExists = await Service.findOne({ name });

    if (serviceExists) {
      return res.status(409).json({
        message: "Service already added.",
      });
    }

    const newService = new Service({
      name,
      description,
    });

    await newService.save();

    res.status(201).json({
      message: "Service added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const viewAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true });

    if (!services) {
      return res.status(404).json({
        message: "No Services available.",
      });
    }

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

module.exports = { addService, viewAllServices };
