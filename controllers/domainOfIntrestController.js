const domainOfIntrest = require('../models/domainOfIntrest');
const httpStatusCode = require('../constant/httpsStatusCode');

const createDomainOfIntrest = async (req, res) => {
    try {
        const {title} = req.body;
        const existingDomainOfIntrest = await domainOfIntrest.findOne({title:title});
        if (existingDomainOfIntrest) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Domain Of Intrest Already Exists"
            });
        }
        const newDomainOfIntrest = await domainOfIntrest.create({
            title
        })
        if(!newDomainOfIntrest){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Domain Of Intrest not created"
            });
        }
        return res.status(httpStatusCode.OK).json({
            status: true,
            message: "Domain Of Intrest created",
            data: newDomainOfIntrest
        })
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            status : false,
            message : error.message
        })
    }
}

const getDomainOfIntrest = async (req, res) => {
    try {
        const domainOfIntrests = await domainOfIntrest.find();
        if(!domainOfIntrests){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Domain Of Intrest not found"
            });
        }
        return res.status(httpStatusCode.OK).json({
            status: true,
            message: "Domain Of Intrest found",
            data: domainOfIntrests
        })
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            status : false,
            message : error.message
        })
    }
}

module.exports = {createDomainOfIntrest, getDomainOfIntrest};