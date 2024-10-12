const bcryptjs = require('bcryptjs');
const userModel = require('../models/userModel');
const httpStatusCode = require('../constant/httpsStatusCode');
const studentModel = require('../models/studentModel');
const adminModel = require('../models/adminModel');
const mentorModel = require('../models/mentorModel');
const companyModel = require('../models/companyModel');
const { getToken } = require('../middleware/authMiddleware');
const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "User Not Found"
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Invalid Username or Password"
            });
        }
        if(isMatch){
            const token = await getToken(user);
            res.cookie('token',token);
            res.status(httpStatusCode.OK).json({
                status: true,
                message: "Login Successfull",
                data:{user, token}
            });

        }else {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                status: false,
                message: "Invalid Username or Password"
        });
    }
        


    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            status: false,
            message: error.message
        });
    }
}

const Register = async (req, res) => {
    try {
        const { email, password, role, username } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message: "User Already Exists"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        let user;
        if(role === 'student'){
            user = await studentModel.create({
                username,
                email,
                password: hashedPassword,
            });
            
        }
        else if(role === 'admin'){
            user = await adminModel.create({
                username,
                email,
                password: hashedPassword,
            });
           
        }else if(role === 'mentor'){
            user = await mentorModel.create({
                username,
                email,
                password: hashedPassword,
            });
           
        }
        else if(role === 'company'){
            user = await companyModel.create({
                username,
                email,
                password: hashedPassword,
            });
            
        }
       
        if(!user){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message:"User registration failed"
            })
        }
        user = await userModel.create({
            email,
            password: hashedPassword,
            role,
            isprofilecompleted: false,
            userId: user._id
        })
        if(!user){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                status: false,
                message:"User registration failed"
            })
        }
        return res.status(httpStatusCode.OK).json({
            status: true,
            message: `${role} Registered Successfully`,
            data: user
        });
     
    } catch (error) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
};


module.exports = {Login, Register};