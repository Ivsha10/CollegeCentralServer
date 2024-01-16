const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    username: {type: String, require: true},
    password: {type: String, require: true},
    fullName: String,
    email: String,
    role:String, 
    age: Number,
    credits: Number,
    profilePicture: String,
    playerProfile: {},
    coachProfile: {},
    invoices: [],
    refreshToken: String,
    friends:[],
    balance: Number,
    sentFriendRequests:[],
    receivedFriendRequests:[],
    socketId: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;