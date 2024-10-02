const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true,
        trim : true,
        lowercase : true
    }, 
    email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true
    },
    jobApplied:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job"
    }],
    mentorshipsession:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Mentor"
    }],
    blogPost:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Blog"
    }],
}, {
    timestamps : true
});

module.exports = mongoose.model('Student', studentModel);