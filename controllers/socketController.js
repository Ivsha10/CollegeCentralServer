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

    const chatRoomId = data.chatRoomId;
    const foundChatRoom = await ChatRoom.findById(chatRoomId);
    const members = foundChatRoom.members;

    const friendId = members.find(id => id !== userId);

    const isSocketInRoom = io.sockets.adapter.rooms[chatRoomId]?.sockets[socket.id];
    if (!isSocketInRoom) {
        socket.join(chatRoomId);
        console.log(` ${socket.id} rejoined room ${chatRoomId}!\n`);
    }

    console.log(`${userId} callling ${friendId}...`);
    socket.to(chatRoomId).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
}

const handleAnswerCall = async (socket, data) => {

    const chatRoomId = data.chatRoomId;

    console.log('Call Accepted');
    socket.to(chatRoomId).emit('callAccepted', data.signal);
}

const handleDeclineCall = async (io, data) => {
    const chatRoomId = data.chatRoomId;
    console.log('Call Declined');

    io.in(chatRoomId).emit('callDeclined', 'callDeclined')
}


const handleEndCall = (io, data) => {
    const chatRoomId = data.chatRoomId;
    console.log('Call Ended');
    io.in(chatRoomId).emit('callEnded', 'callDeclined')

}
module.exports = { setUserId, joinRoom, handleMessage, handleActivity, handleRoomRejoin, handleCallUser, handleAnswerCall, handleDeclineCall, handleEndCall };