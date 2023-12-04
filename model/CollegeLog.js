const mongoose = require('mongoose');
const {Schema} = mongoose;

const collegeLogSchema = new Schema({

    name: {type: String, require: true},
    addedBy: {type: String, require: true},
    dateAdded: {type: Date, require: true}
})

const CollegeLog = mongoose.model('CollegeLog', collegeLogSchema);

module.exports = CollegeLog;