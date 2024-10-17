const httpsStatusCode = require('../constant/httpsStatusCode')
const degreeModel = require('../models/degreeModel');

const addDegree = async(req, res) => {
    try {
        const {degree} = req.body;
        if(!degree){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status : false,
                message : "Degree field is required"
            })
        }
        const existingDegree = await degreeModel.findOne({degree});
        if(existingDegree){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status : false,
                message : "Degree already exists"
            })
        }
        const newDegree = await degreeModel.create({
            degree
        })
        if(!newDegree){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status : false,
                message : "Degree not added"
            })
        }
        return res.status(httpsStatusCode.CREATED).json({
            status : true,
            message : "Degree added sucessfully",
            data : newDegree
        })
        
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status : false,
            message : "Something went wrong",
            error : error.message
        })
        
    }
}

const getDegree = async(req, res) => {
    try {
        const degrees = await degreeModel.find();
        if(!degrees){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status : false,
                message : "No degrees found"
            })
        }
        return res.status(httpsStatusCode.OK).json({
            status : true,
            message : "Degrees found",
            data : degrees
        })
    } catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}

module.exports = {
    addDegree,
    getDegree
}