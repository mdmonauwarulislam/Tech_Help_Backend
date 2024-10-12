const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'admin', "mentor", "company"],
    },
    userId : {
        type: String,
        required: true,
    },
    isprofilecompleted:{
        type:Boolean,
        default : false
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);