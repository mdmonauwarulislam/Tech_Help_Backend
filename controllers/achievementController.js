const achievementModel = require("../models/achievementMoldel");
const httpsStatusCode = require("../constant/httpsStatusCode");

// add achievement
const addAchievement = async (req, res) => {
  try {
    const { activity } = req.body;
    const achievement = await achievementModel.create({
      activity,
    });
    if (!achievement) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Achievement not created",
      });
    }
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Achievement not created",
      error: error.message,
    });
  }
};

// update achievement
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity } = req.body;
    const achievement = await achievementModel.findByIdAndUpdate(
      id,
      { activity },
      { new: true }
    );
    if (!achievement) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Achievement not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Achievement not updated",
      error: error.message,
    });
  }
};

// get all achievements
const getAchievements = async (req, res) => {
  try {
    const achievements = await achievementModel.find();
    if (!achievements) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Achievement not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Achievement found",
      data: achievements,
    });
  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

// delete achievement
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await achievementModel.findByIdAndDelete(id);
    if (!achievement) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Achievement not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Achievement not deleted",
      error: error.message,
    });
  }
};

// get single achievement
const getSingleAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await achievementModel.findById(id);
    if (!achievement) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Achievement not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Achievement found",
      data: achievement,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Achievement not found",
      error: error.message,
    });
  }
};

module.exports = {
  addAchievement,
  updateAchievement,
  getAchievements,
  deleteAchievement,
  getSingleAchievement,
};
