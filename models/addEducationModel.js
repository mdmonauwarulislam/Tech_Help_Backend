
const mongoose = require('mongoose');

const addEducationSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    college : [{

        collegeName :{
                type : String,
            },
        fieldOfStudy : {
            type : String,
        },
        degree : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Degree"
        },
        grade : {
            type : String,
        },
        startYear : {
            type : Number,
        },
        endYear : {
            type : Number,
        },
    }],
    school : [{
        schoolName : {
            type : String
        },
        classof : {
            type : String,
        },
        yearOfPassing : {
            type : Number
        },
        grade: {
            type : String
        }
    }],
}, {timestamps : true});

module.exports = mongoose.model('AddEducation', addEducationSchema);