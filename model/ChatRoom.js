const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatRoomSchema = new Schema({
    members: [],
    messages: []
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
