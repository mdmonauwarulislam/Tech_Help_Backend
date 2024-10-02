const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    profile: {
        type: String,
    },
    yearofexperience: {
        type: Number,
    },
    about : [{
        type: String,
        required: true,
    }],
    topic : [{
        type: String,
    }],
    skill : [{
        type: String,
        required: true,
    }],
    language : [{
        type: String,
        required: true,
    }],
    education : [{
        institute: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        startYear: {
            type: Number,
            required: true,
        },
        endYear: {
            type: Number,
            required: true,
        },
    }],
    experience : [{
        companyname: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        startYear: {
            type: Number,
            required: true,
        },
        endYear: {
            type: Number,
            required: true,
        },
    }],
    password: {
        type: String,
        required: true,
    },
    availibility: {
        type: Boolean,
    },

})

module.exports = mongoose.model('Mentor', mentorSchema);