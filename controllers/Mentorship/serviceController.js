const serviceSchema = require("../../models/mentorship/serviceModel");
const httpsStatusCode = require("../../constant/httpsStatusCode");
const Mentor = require("../../models/mentorModel");

const createService = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const {
      title,
      description,
      duration,
      price,
      availability,
      isGroupSession,
      maxParticipants,
      zoomLink,
      isActive,
    } = req.body;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        status: false,
        message: "User must be logged in",
      });
    }

    // Create new service
    const newService = new serviceSchema({
      user: userId,
      title,
      description,
      duration,
      price,
      availability,
      isGroupSession,
      maxParticipants,
      zoomLink,
      isActive,
    });

    await newService.save();

    // Add service ID to the mentor model
    await Mentor.findByIdAndUpdate(userId, {
        $push: { services: newService},
      });
  

    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      availability,
      isGroupSession,
      maxParticipants,
      zoomLink,
      isActive,
    } = req.body;
    const mentorId = req.user.user.userId;
    const service = await serviceSchema.findOneAndUpdate(
      { user: mentorId },
      {
        title,
        description,
        duration,
        price,
        availability,
        isGroupSession,
        maxParticipants,
        zoomLink,
        isActive,
      },
      { new: true }
    );

    if (!service) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Service not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    const service = await serviceSchema.findOneAndDelete({ user: userId });

    if (!service) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Service not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const services = await serviceSchema.find();

    if (!services) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Services not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Services found",
      data: services,
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

const getSingleService = async (req, res) => {
  try {
    const service = await serviceSchema.findById(req.params.id);

    if (!service) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Service not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      status: true,
      message: "Service found",
      data: service,
    });
  } catch (error) {
    return res.status(httpsStatusCode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getSingleService,
};
