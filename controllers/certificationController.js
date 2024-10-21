const certificationModel = require("../models/certificationModel");
const httpsStatusCode = require("../constant/httpsStatusCode");

// Add Certification
const addCertification = async (req, res) => {
  try {
    const {
      title,
      descriptionPoints,
      completionMonth,
      completionYear,
      certificationLink,
      skills,
    } = req.body;

    if (
      !title ||
      !descriptionPoints ||
      !completionMonth ||
      !completionYear ||
      skills.length < 2
    ) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message:
          "All required fields must be filled, and at least 2 skills must be provided.",
      });
    }

    const certification = await certificationModel.create({
      title,
      descriptionPoints,
      completionMonth,
      completionYear,
      certificationLink,
      skills,
    });
    if (!certification) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Certification not created.",
      });
    }
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Certification created successfully.",
      data: certification,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Certification not created.",
      error: error.message,
    });
  }
};

// Get All Certifications of a User
const getAllCertifications = async (req, res) => {
  try {
    const certifications = await certificationModel.find();
    if (!certifications) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Certifications not found.",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Certifications fetched successfully.",
      data: certifications,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Certifications not fetched.",
      error: error.message,
    });
  }
};

// Update Certification
const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      descriptionPoints,
      completionMonth,
      completionYear,
      certificationLink,
      skills,
    } = req.body;

    if (
      !title ||
      !descriptionPoints ||
      !completionMonth ||
      !completionYear ||
      skills.length < 2
    ) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message:
          "All required fields must be filled, and at least 2 skills must be provided.",
      });
    }
    const certification = await certificationModel.findByIdAndUpdate(
        id,
        {
            title,
            descriptionPoints,
            completionMonth,
            completionYear,
            certificationLink,
            skills,
        },
        { new: true }
        );
    if (!certification) {
        return res.status(httpsStatusCode.NOT_FOUND).json({
            success: false,
            message: "Certification not found.",
        });
    }
    return res.status(httpsStatusCode.OK).json({
        success: true,
        message: "Certification updated successfully.",
        data: certification,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Certification not updated.",
      error: error.message,
    });
  }
};

// Delete Certification
const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certification = await certificationModel.findByIdAndDelete(id);

    if (!certification) {
      return res
        .status(httpsStatusCode.NOT_FOUND)
        .json({ error: "Certification not found or already deleted." });
    }

    return res
      .status(httpsStatusCode.OK)
      .json({ message: "Certification deleted successfully." 

      });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Certification not deleted.",
      error: error.message,
    });
  }
};

module.exports = {
  addCertification,
  getAllCertifications,
  updateCertification,
  deleteCertification,
};