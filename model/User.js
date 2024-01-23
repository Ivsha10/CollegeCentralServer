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
    socketId: String,
    deviceTokens: [],
    starredChats:[],
    verificationCode: {},
    isOtp: Boolean,
    stats: {
        profileViews: Number,
    },
    lastPaymentSession: {sessionId: String, amount:Number}
})

const User = mongoose.model('User', userSchema);

module.exports = User;