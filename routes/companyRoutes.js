const {updateCompanyDetails, getCompanyDetails} = require('../controllers/updateCompanyDetails');

const express = require("express");
const Router = express.Router();
const {verifyToken, verifyRole} = require("../middleware/authMiddleware");
const upload = require('../middleware/multerMiddle');

Router.put("/updatecompanydetails", verifyToken, verifyRole(["company"]), upload.single("companyLogo"), updateCompanyDetails);
Router.get("/getcompanydetails", verifyToken, verifyRole(["company"]), getCompanyDetails);

module.exports = Router;