const User = require('../model/User');
const ChatRoom = require('../model/ChatRoom');

const setUserId = async (socketId, dbId) => {

    const user = await User.findById(dbId);

    if (user) {
        user.socketId = socketId;
        await user.save();
        console.log(`${socketId} added to user ${user.username} in db\n`);
    } else {
        console.log(`User with an id ${dbId} not found!`)
    }

}

const joinRoom = async (socket, roomObj) => {



    const userDbId = roomObj.userDbId;
    const chatMembers = roomObj.chatMembers;

    const friendDbId = chatMembers.filter(id => id !== userDbId);


    const joinedUser = await User.findById(userDbId).exec();
    const friend = await User.findById(friendDbId).exec();


    let query = { members: { $all: chatMembers } };

    let foundChat = await ChatRoom.findOne(query).exec();

    if (!foundChat) {

        foundChat = new ChatRoom({ members: chatMembers });
        await foundChat.save();

        console.log('New Chat Created!');

    }

    const chatId = foundChat.id;
    const messages = foundChat.messages;

    const friendName = friend.fullName ? friend.fullName : friend.username;

    socket.join(chatId);
    console.log(`${joinedUser.username} joined room ${chatId}!\n`);

    socket.emit('chatRoom', { chatId: chatId, messages: messages, friendId: friendDbId, friendName: friendName });

}
const handleRoomRejoin = (io, socket, roomId) => {

    const isSocketInRoom = io.sockets.adapter.rooms[roomId]?.sockets[socket.id];
    if (!isSocketInRoom) {
        socket.join(roomId);
        console.log(` ${socket.id} rejoined room ${roomId}!\n`);
    }

}
const handleActivity = (socket, data) => {
    const activity = data.activity;
    const roomId = data.roomId;

    socket.to(roomId).emit('activity', activity);
}
const handleMessage = async (io, message, roomId) => {
    console.log(message);


    let time = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date());
    let from = message.from;
    let content = message.message;
    let newMSg = {
        from: from,
        message: content,
        time: time
    }
    let foundChat = await ChatRoom.findById(roomId);





    message = newMSg;
    io.to(roomId).emit('message', { message });

    const ids = foundChat.members;
    let friendId = '';



    foundChat.messages.push({ ...message, time });
    await foundChat.save();
}

//Continue with chat features



// VideoChat functions

const handleCallUser = async (io, socket, data) => {

    const userId = data.from;
    const friendId = data.friendId;
    const foundFriend = await User.findById(friendId);
    if (foundFriend) {
        const friendSocketId = foundFriend.socketId;
        console.log(`${socket.id} callling ${friendSocketId}...`);
        socket.to(friendSocketId).emit("callUser", {from: data.from, name: data.name });        
    }


}

const handleAnswerCall = async (io, data) => {

    const friendId = data.friendId;
    const foundFriend = await User.findById(friendId);
    if (foundFriend) {
        const friendSocketId = foundFriend.socketId;
        io.to(friendSocketId).emit('callAccepted', {msg : 'Call Accepted'});
        console.log('Accepted Call');
    } else {
        console.log('Cant find friend');
    }
}

const handleDeclineCall = async (io, data) => {
    const friendId = data.friendId;
    const foundFriend = await User.findById(friendId);
    if (foundFriend) {
        const friendSocketId = foundFriend.socketId;
        io.to(friendSocketId).emit('callDeclined', {});
        console.log('Declined Call');
    }
}


const handleEndCall = async (io, data) => {
    const friendId = data.friendId;
    const foundFriend = await User.findById(friendId);
    if (foundFriend) {
        const friendSocketId = foundFriend.socketId;
        io.to(friendSocketId).emit('callEnded', {});
        console.log('ended Call');
    }

}
module.exports = { setUserId, joinRoom, handleMessage, handleActivity, handleRoomRejoin, handleCallUser, handleAnswerCall, handleDeclineCall, handleEndCall };