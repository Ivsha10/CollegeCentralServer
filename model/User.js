const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    username: {type: String, require: true},
    password: {type: String, require: true},
    fullName: String,
    email: String,
    roles: ['admin', 'user,','editor'], 
    image: {type: String, require: true},
    invoices: [],
    refreshToken: String,
    friends:[],
    sentFriendRequests:[],
    receivedFriendRequests:[],
    socketId: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;