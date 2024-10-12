const socialPlateformModel = require('../models/socialPlateformModel');
const httpsStatusCode = require('../constant/httpsStatusCode');

const createSocialPlateform = async (req, res) => {
    try {
        const { name, link } = req.body;
        if(!name || !link ){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "All fields are required"
            });
        }
        const existingSocialPlateform = await socialPlateformModel.findOne ({name});
        if(existingSocialPlateform){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Social Plateform Already Exists"
            });
        }
        const socialPlateform = await socialPlateformModel.create({
            name,
            link
        });
        if(!socialPlateform){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Social Plateform Not Created"
            });
        }
        return res.status(httpsStatusCode.CREATED).json({
            status: true,
            message: "Social Plateform Created",
            data: socialPlateform
        });
    } catch (error) {
        res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

const updateSocialPlateform = async (req, res) => {
    try {
        const { name, link } = req.body;

        const socialPlateform = await socialPlateformModel.findByIdAndUpdate(req.params.id, {
            name,
            link
        })
        if(!socialPlateform){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Social Plateform Not Found"
            });
        }
        socialPlateform.save();
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Social Plateform Updated",
            data: socialPlateform
        })
    } catch (error) {
        res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

const deleteSocialPlateform = async (req, res ) => {
    try {
        let socialPlateform = await socialPlateformModel.findById(req.params.id);
        if(!socialPlateform){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Social Plateform Not Found"
            });
        }
        socialPlateform = await socialPlateformModel.findByIdAndDelete(req.params.id)
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Social Plateform Deleted",
            data: socialPlateform
        })
        
    } catch (error) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

const getAllSocialPlateform = async (req, res) => {
    try {
        let socialPlateform = await socialPlateformModel.find();
        if(!socialPlateform){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Social Plateform Not Found"
            });
        }
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Social Plateform Found",
            data: socialPlateform
        })
    } catch (error) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {createSocialPlateform, updateSocialPlateform, deleteSocialPlateform, getAllSocialPlateform};