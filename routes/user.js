const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

const upload = multer({ dest: 'images/userImages' });

router.get('/:user', async (req, res) => {

    const username = req.params.user
    try {
        let users = await User.find().exec();
        users = users.filter(user => user.username !== username);
        let filteredUsers = [];
        users.forEach(user => {
            let fullName = user.fullName ? user.fullName : user.username;
            let id = user._id;
            let roles = user.roles
            let friends = user.friends;
            filteredUsers.push(
                { id, fullName, roles, friends}
            )});
        
        return res.json(filteredUsers);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong!');
    }

})


router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const reqId = req.body.id;

    //user that sent friend request
    const reqFriend = await User.findById(reqId).exec();
    reqFriend.sentFriendRequests.push(id);
    await reqFriend.save();
    const friendRequests= reqFriend.sentFriendRequests;
    friendRequests.push(id);
    //
    
    //user that received friend request
    const recFriend = await User.findById(id).exec();
    recFriend.receivedFriendRequests.push(reqId);
    await recFriend.save();
    //
    
    res.status(200).json({friendRequests});

});

router.put('/accept/:id', async (req, res) => {
    const userId = req.params.id;
    const acceptId = req.body.acceptId;

    const user = await User.findById(userId);
    const acceptUser = await User.findById(acceptId);

    let arr = user.receivedFriendRequests.filter(id => id!== acceptId);
    user.receivedFriendRequests = arr;
    user.friends.push(acceptId);
    await user.save()

    let arr2 = acceptUser.sentFriendRequests.filter(id => id !== userId);
    acceptUser.sentFriendRequests = arr2;
    acceptUser.friends.push(userId);
    await acceptUser.save();

    console.log(user);
    console.log(acceptUser);

    

});


router.post('/', upload.single('image'), async (req, res) => {
    const username = req.query.param;
    console.log(req.file);
    const { fullName, email } = req.body;
    const foundUser = await User.findOne({ username: username }).exec();

    foundUser.fullName = fullName;
    foundUser.email = email;
    if (req?.file?.filename) {
        foundUser.image = req.file?.filename;
    }

    const result = await foundUser.save();
    res.json({
        'username': foundUser.username,
        'email': foundUser.email,
        'fullName': foundUser.fullName,
        'photo': foundUser.image
    });
})


router.put('/', async (req, res) => {
    const users = req.body;
    let filteredUsers = [];
    for (let user of users) {
        const foundUser = await User.findById(user.id).exec();
        foundUser.roles = user.roles;
        const result = await foundUser.save();
        const username = foundUser.username;
        const roles = foundUser.roles;
        const id = foundUser.id;
        filteredUsers.push({ id, username, roles });
        console.log(result);
    }

    res.json(filteredUsers);
});

router.get('/players/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const foundCoach = await User.findById(id).exec();
    
        const coachSport = foundCoach.coachProfile.sport;
    
        let possiblePlayers = [];
    
        const allPlayers = (await User.find().exec()).filter(user => user.role === 'player');
    
        allPlayers.forEach(player => {
            if(player.playerProfile.sport === coachSport) {
                player.password = '';
                const pictureUrl = `https://collegecentralbucket.s3.amazonaws.com/users/players/${player.username}/${player.profilePicture}`;
                player.profilePicture = pictureUrl;

                possiblePlayers.push(player);

            }
        })
    
        res.json({'players': possiblePlayers});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
   

})

module.exports = router;