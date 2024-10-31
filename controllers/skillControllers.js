const skillsModel = require('../models/skillsModel');
const httpsStatusCode = require('../constant/httpsStatusCode');

const addSkills = async (req, res) => {
    try {
        const { tagline, skills } = req.body;
        const newSkill = await skillsModel.create({
            tagline,
            skills,
        })
        if(!newSkill){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                success: false,
                message: 'Skill not created'
            })
        }
        return res.status(httpsStatusCode.CREATED).json({
            success: true,
            message: 'Skill created successfully',
            data: newSkill
        });
        
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

// Get user details (tagline and skills)
const getAllSkills = async (req, res) => {
    try {
        const skills = await skillsModel.find();
        if(!skills){
            return res.status(httpsStatusCode.NOT_FOUND).json({
                success: false,
                message: 'Skills not found'
            })
        }
        return res.status(httpsStatusCode.OK).json({
            success: true,
            message: 'Skills found',
            data: skills
        });
        
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// update skills details (tagline and skills)
const updateUserDetails = async (req, res) => {
    try {
        const { tagline, skills } = req.body;
        const updateSkills = await skillsModel.findByIdAndUpdate(req.params.id, {
            tagline,
            skills,
        }, {new: true})
        if(!updateSkills){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                success: false,
                message: 'Skills not updated'
            })
        }
        return res.status(httpsStatusCode.OK).json({
            success: true,
            message: 'Skills updated successfully',
            data: updateSkills
        });

    }catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

// delete skills details (tagline and skills)
const deleteUserDetails = async (req, res) => {
    try {
        const skills = await skillsModel.findByIdAndDelete(req.params.id);
        if(!skills){
            return res.status(httpsStatusCode.NOT_FOUND).json({
                success: false,
                message: 'Skills not found'
            })
        }
        return res.status(httpsStatusCode.OK).json({
            success: true,
            message: 'Skills deleted successfully',
        });
        
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

module.exports = {
    addSkills,
    getAllSkills,
    updateUserDetails,
    deleteUserDetails
};