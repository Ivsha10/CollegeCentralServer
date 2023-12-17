const mongoose = require('mongoose');
const {Schema} = mongoose;

const collegeSchema = new Schema({

    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, require: true},
    tuitionFee: {type: Number, required: true},
    acceptanceRate: {type: Number, required: true},
    studentPopulation: {type: Number, required: true},
    campusPopulation: {type: Number, required: true},
    association: {type: String, required: true},
    division: {type: String, required: true},
    conference: {type: String, required: true},
    sports: {type: Array, require: true},
    sportsWebsite: {type: String, required: true},
    academicRanking: {type: Number, required: true},
    schoolWebsite: {type: String, required: true},
    avgScholarship: {type: Number},
    majors: {type: Array, required: true},
    twoYear: {type: Boolean, required: true},
    religion: {type: String, required: true},
    relInfluence: {type: Number, required: true},
    avgTemp: {type: Number, required: true},
    sunnyDays: {type: Number, required: true},
    rainyDays: {type: Number, required: true},
    severeWeather: {type: Number, required: true},
    facilities: []
})

const College = mongoose.model('College', collegeSchema);

module.exports = College;