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
    const friendId = data.userToCall;
    const foundFriend = await User.findById(friendId);
    if (foundFriend) {
        const friendSocketId = foundFriend.socketId;
        console.log(`${userId} calling ${friendSocketId}`);
        socket.to(friendSocketId).emit("callUser", { from: data.from, name: data.name, signal: data.signalData });
    }


}

const handleAnswerCall = async (io, data) => {

    const friendSocketId = data.to;

    io.to(friendSocketId).emit('callAccepted', data.signal);
    console.log('Accepted Call');

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
    console.log(data);
    const isCaller = data.calling;

    if (isCaller) {
        const friendId = data.friendId;
        const foundFriend = await User.findById(friendId);
        if (foundFriend) {
            const friendSocketId = foundFriend.socketId;
            io.to(friendSocketId).emit('callEnded', {});
            console.log('ended Call');
        }
    } else {
        const friendSocketId = data.friendId;
        io.to(friendSocketId).emit('callEnded', {});
        console.log('ended Call');
    }



}


// Controls for connections page
const handleUserSocials = async (socket, id) => {

   
    const foundUser = await User.findById(id).exec();

    let friendsSet = new Set(foundUser.friends);
    let friends = [...friendsSet];

    let sentReqSet = new Set(foundUser.sentFriendRequests);
    let sentReq = [...sentReqSet];

    let receivedReqSet = new Set(foundUser.receivedFriendRequests);
    let receivedReq = [...receivedReqSet];

    let possibleConnections = [...friends, ...sentReq, ...receivedReq];

    let otherUsers = [];




    foundUser.friends = friends;
    foundUser.sentFriendRequests = sentReq;
    foundUser.receivedFriendRequests = receivedReq;

    await foundUser.save();

    let allUsers = await User.find().exec();

    const mapArray = async (arr) => {
        for await (const friend of arr.map(async friendId => typeof (friendId) === 'string' && await User.findById(friendId).exec())) {

            let id = friend.id;
            let fullName = friend.fullName ? friend.fullName : friend.username
            let role = friend.roles[0];

            const friendObj = {
                id, fullName, role
            }

            arr.push(friendObj);
            arr.shift();
        }

    }

    await mapArray(friends);
    await mapArray(sentReq);
    await mapArray(receivedReq);
   
    allUsers.forEach(user => {
        if (!possibleConnections.includes(user.id) && user.id !== id) {

            let id = user.id;
            let fullName = user.fullName ? user.fullName : user.username
            let role = user.roles[0];

            const friendObj = {
                id, fullName, role
            }

            otherUsers.push(friendObj);
        }
    })


    const data = { friends: friends, sentFriendRequests: sentReq, receivedFriendRequests: receivedReq, possibleConnections: otherUsers }
    socket.emit('userSocials', data);




}

const handleFriendRequest = async (io, socket, data) => {
    console.log(data);
    const sender = await User.findById(data.userId).exec();
    const receiver = await User.findById(data.friendId).exec();

    if(!sender.sentFriendRequests.includes(data.friendId)){
        sender.sentFriendRequests.push(data.friendId);
        await sender.save(); 
    }

    if(!receiver.sentFriendRequests.includes(data.userId)){
        receiver.receivedFriendRequests.push(data.userId);   
        await receiver.save();
    }

    console.log('sender sent to:', sender.sentFriendRequests);
    console.log('receiver received from:', receiver.receivedFriendRequests);

    handleUserSocials(socket, data.userId);

    let time = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date());

    const fullName = sender.fullName ? sender.fullName : sender.username;

    io.to(receiver.socketId).emit('newFriendRequest', {time:time, message: `${fullName} sent you a friend request!`});
}


const handleAcceptRequest = async (io, socket, data) => {
    
    const {userId, friendId} = data;

    const foundUser = await User.findById(userId).exec();
    const foundFriend = await User.findById(friendId).exec();

    const newReceived = foundUser.receivedFriendRequests.filter(id => id !== friendId);
    const newSent = foundFriend.sentFriendRequests.filter(id => id !== userId);
    
    foundUser.receivedFriendRequests = newReceived;
    foundFriend.sentFriendRequests = newSent;

    foundUser.friends.push(friendId);
    foundFriend.friends.push(userId);

    await foundUser.save();
    await foundFriend.save();

    handleUserSocials(socket, userId);

    const fullName = foundUser.fullName ? foundUser.fullName : foundUser.username;
    let time = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date());

    io.to(foundFriend.socketId).emit('requestAccepted',{time:time, message: `${fullName} accepted your friend request!`});

}
module.exports = { setUserId, joinRoom, handleMessage, handleActivity, handleRoomRejoin, handleCallUser, handleAnswerCall, handleDeclineCall, handleEndCall, handleUserSocials, handleFriendRequest, handleAcceptRequest };