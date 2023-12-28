const User = require('../model/User');
const ChatRoom = require('../model/ChatRoom');

const setUserId = async (socketId, dbId) => {

    const user = await User.findById(dbId);

    if(user) {
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

    if(!foundChat) {
        
        foundChat = new ChatRoom({members: chatMembers});
        await foundChat.save();

        console.log('New Chat Created!');
        
    }

    const chatId = foundChat.id;
    const messages = foundChat.messages;

    const friendName = friend.fullName ? friend.fullName : friend.username;

    socket.join(chatId);
    console.log(`${joinedUser.username} joined room ${chatId}!\n`);

    socket.emit('chatRoom', {chatId: chatId, messages: messages, friendId:friendDbId,  friendName: friendName});

}
const handleRoomRefresh =  (io, socket, roomId) => {

    const isSocketInRoom = io.sockets.adapter.rooms[roomId]?.sockets[socket.id];
    if(!isSocketInRoom) {
        socket.join(roomId);
        console.log(` ${socket.id} rejoined room ${roomId}!\n`);

    }

}
const handleMessage = async (io, message, roomId) => {


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

    
   let userId =  foundChat.members.forEach(async (memberId) => {
        let user = (await User.findById(memberId).exec());
        if(user !== from) return user.id
    })

    
    message = newMSg;
    io.to(roomId).emit('message', { message });
    io.to(userId).emit('notification', { message });
    foundChat.messages.push({ ...message, time });
    await foundChat.save();
    console.log(message);
} 

//Continue with chat features



// VideoChat functions

const handleCallUser = async (io, data) => {

    console.log(data);
    const friendId = data.friendId;
    const foundUser =  await User.findById(friendId).exec();
    
    const friendSocketId = foundUser.socketId;
    console.log('Friend Socket Id: ', friendSocketId);

    io.to(friendSocketId).emit("callUser", {signal: data.signalData, from: data.from, name:data.name});
}

const handleAnswerCall = async (io, data) => {
    const friendId = data.to;
    const foundFriend = await User.findById(friendId)
    io.emit('callAccepted', data.signal);
}

const handleDeclineCall = async (io, friendId) => {
    const foundUser =  await User.findById(friendId).exec();
    io.to(foundUser.socketId).emit('callDeclined', 'callDeclined')
}
module.exports = {setUserId, joinRoom, handleMessage, handleRoomRefresh, handleCallUser, handleAnswerCall, handleDeclineCall };