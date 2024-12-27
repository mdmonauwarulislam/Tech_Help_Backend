const jwt = require('jsonwebtoken');
const httpsStatusCode = require("../constant/httpsStatusCode");
const dotenv = require('dotenv');
dotenv.config();

async function getToken(user){
    const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "1d"});
    return token;
}

async function verifyToken(req, res, next){
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    console.log(token);
    if(!token){
        return res.status(httpsStatusCode.UNAUTHORIZED).json({
            status: false,
            message: "Unauthorized"
        });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user)
        next();
    } catch (error) {
        return res.status(httpsStatusCode.UNAUTHORIZED).json({
            error:error.message,
            status: false,
            message: "Unauthorized"
        });
    }
}

// async function verifyRole(role){
//     return (req, res, next) => {
//         if(req.user.user.role === role){
//             next();
//         }else {
//             return res.status(httpsStatusCode.UNAUTHORIZED).json({
//                 status: false,
//                 message: "Unauthorized"
//             });
//         }
//     }
// }

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.user.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    };
  };
  

module.exports = {getToken, verifyToken, verifyRole};