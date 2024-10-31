const httpsStatusCode = require('../constant/httpsStatusCode');
const studentModel = require('../models/studentModel');

const updateStudentSkills =  async (req, res) => {
    try {
        const {skills} = req.body;
        const userId = req.user.user.userId;
        const student = await studentModel.findByIdAndUpdate(userId, {
            skills: skills
        }, {new: true});
        if(!student){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Student not found"
            });
        }
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Student found",
            data: student
        });
        
    } catch (error) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
        
    }
}
const updateStudentProfile = async (req, res) =>{
    
    try {
        const {username, profilePicture,domainOfIntrest, university, graduationYear, hometstate, githubProfile,linkedinProfile} = req.body;
        console.log("req",req.body)
        console.log(username, profilePicture,domainOfIntrest, university, graduationYear,hometstate, githubProfile,linkedinProfile)
        let student = await studentModel.findByIdAndUpdate(req.user.user.userId,{
            username,
            profilePicture :req.file.filename,
            domainOfIntrest,
            university,
            graduationYear,
            hometstate,
            githubProfile,
            linkedinProfile
        },{new: true});
       
        
        if(!student){
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "User not found"
            });
        }
        return res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Student found",
            data: student
        })
    } catch (error) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            status : false,
            message : error.message
        })
    }
}

const getStudentDetails = async (req, res) => {
    try {
        // Get the userId from the request
        const userId = req.user.user.userId;
        console.log("User ID:", userId);
        if (!userId) {
            return res.status(400).json({ status: false, message: 'Invalid user ID format.' });
        }
        // Find the student document using the userId
        const student = await studentModel.findById(userId ).populate('domainOfIntrest');

        // Check if the student was found
        if (!student) {
            return res.status(httpsStatusCode.NOT_FOUND).json({
                status: false,
                message: "Student not found",
            });
        }

        // Return the student data if found
        res.status(httpsStatusCode.OK).json({
            status: true,
            message: "Student found",
            data: student,
        });
    } catch (error) {
        res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message,
        });
    }
};



module.exports = {getStudentDetails, updateStudentProfile, updateStudentSkills};