const companyModel = require('../models/companyModel');
const httpsStatusCode = require("../constant/httpsStatusCode");

const updateCompanyDetails = async (req, res) => {
    try {
        const {username, companyLogo, aboutCompany, industryType, companyType, companyWebsite, email, companySize, companyAddress} = req.body;
        const companyId = req.user.user.userId;
        console.log(req.body);
        console.log(companyId);
        const company = await companyModel.findByIdAndUpdate(companyId, {
            username,
            companyLogo: req?.file?.filename || "logo.jpg",
            aboutCompany,
            companyWebsite,
            email,
            companySize,
            companyAddress,
            industryType,
            companyType
        }, {new: true});
        if(!company){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Company not found"
            });
        }
        console.log("cghv:",company);
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Company found",
            data: company
        });
        
    } catch (error) {
        console.log(error);
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
        
    }
}

const getCompanyDetails = async (req, res) => {
    try {
        const companyId = req.user.user.userId;
        const company = await companyModel.findById(companyId);
        if(!company){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Company not found"
            });
        }
        console.log(company);
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Company found",
            data: company
        });

    } catch (error) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {updateCompanyDetails, getCompanyDetails};