const mongoose = require('mongoose');

const skillDomainSchema = new mongoose.Schema({
   title : {
        type: String,
        required : true
    }
}, {timestamps: true});

module.exports = mongoose.model('SkillDomain', skillDomainSchema);