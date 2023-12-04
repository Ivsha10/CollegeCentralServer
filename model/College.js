const mongoose = require('mongoose');
const {Schema} = mongoose;

const collegeSchema = new Schema({

    name: {type: String, require: true},
    address: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    zip: {type: String, require: true},
    tuitionFee: {type: Number, require: true},
    acceptanceRate: {type: Number, require: true},
    studentPopulation: {type: Number, require: true},
    campusPopulation: {type: Number, require: true},
    association: {type: String, require: true},
    division: {type: String, require: true},
    conference: {type: String, require: true},
    sports: {type: Array, require: true},
    sportsWebsite: {type: String, require: true},
    academicRanking: {type: Number, require: true},
    schoolWebsite: {type: String, require: true},
    avgScholarship: {type: Number, require: true},
    majors: {type: Array, require: true},
    twoYear: {type: Boolean, require: true},
    religion: {type: String, require: true},
    relInfluence: {type: Number, require: true},
    avgTemp: {type: Number, require: true},
    sunnyDays: {type: Number, require: true},
    rainyDays: {type: Number, require: true},
    severeWeather: {type: Number, require: true},
    pdf: {type: String, require: true},
})

const College = mongoose.model('College', collegeSchema);

module.exports = College;