const ChatRoom = require('../model/ChatRoom');

const getChatRoomId = async (req, res) => {
    const reqMembers = req.body.members;
    
    let query = {members: {$all: reqMembers}};
    let foundChat = await ChatRoom.findOne(query).exec();
    
    if(!foundChat) {

        //Crete a new chat
       console.log('NEW CHAT CREATED');
       foundChat = new ChatRoom({
            members: reqMembers,
            messages:[]
        });

        await foundChat.save();
     
    }
    const id = foundChat.id;
    const messages = foundChat.messages;
    return res.json({id, messages});
}

module.exports = {getChatRoomId}