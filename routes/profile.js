const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const multer = require('multer');
const User = require('../model/User');
const ChatRoom = require('../model/ChatRoom');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 10,
        fileSize: 1000 * 1024 * 1024
    }
});


AWS.config.update({
    accessKeyId: 'AKIAZOEMY2CS4XZSDE6Y',
    secretAccessKey: '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',
    region: 'us-east-1',
});


const s3 = new AWS.S3();
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    const foundUser = await User.findById(id).exec();

    const friends = foundUser.friends;

    const oppositeRole = foundUser.role === 'player' ? 'coach' : 'player';


    const possibleFriends = await User.find({role: oppositeRole }).exec();

    let starredUsersIds = [];
    let starredUsers = [];



    for await (const chat of foundUser?.starredChats.map(async chatId => await ChatRoom.findById(chatId))) {

        let members = chat.members;

        const friendId  = members.find((fId) => fId !== id);
        starredUsersIds.push(friendId);
    }

    let index = 0
    for await (const user of starredUsersIds.map(async (id, index) => await User.findById(id))) {

        const bucketUrl = 'https://collegecentralbucket.s3.amazonaws.com/users';

        const fullName = user.fullName;
        const friendId = user.id;
        const picture = `${bucketUrl}/${user.role}s/${user.username}/${user.profilePicture}`;
        let info2;

    
        if(foundUser.role === 'player') {
            info2 = user.coachProfile.school;
        } else {
            info2 = user.playerProfile.position;
        }
        starredUsers.push({info1: fullName, info2: info2, friendId: friendId, picture: picture});
        
        index++;
    }



    console.log(starredUsers);
    
    

    res.json({friends: friends.length, possibleFriends: possibleFriends.length,  profileViews:foundUser.stats.profileViews, credits: foundUser.credits, starredUsers:starredUsers});
    
})

router.post('/:id', upload.single('video'), async (req, res) => {

    try {
        const video = req.file;
        
        const foundUser = await User.findById(req.params.id).exec();

        const params = {
            Bucket: `collegecentralbucket/users/players/${foundUser.username}/video`,
            Key: video.originalname.split(' ').join(''),
            Body: video.buffer,
        }

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
            }
        })



        const videoURL = `https://collegecentralbucket.s3.amazonaws.com/users/players/${foundUser.username}/video/${video.originalname.split(' ').join('')}`

        let playerProfile = foundUser.playerProfile;
        playerProfile = { ...playerProfile, video: videoURL };
        foundUser.playerProfile = playerProfile;

        await foundUser.save();
        console.log('Success!');
        return res.json(foundUser);

    } catch (error) {
        console.log(error);
        res.status(500).json('Error! Please try again!');
    }


})

router.post('/picture/:id', upload.single('image'), async (req, res) => { 

    try {
        const image = req.file;
        console.log(image);
        const foundUser = await User.findById(req.params.id).exec();

        const urlParam = foundUser.role === 'player' ? 'players': 'coaches'
        const params = {
            Bucket: `collegecentralbucket/users/${urlParam}/${foundUser.username}`,
            Key: image.originalname.split(' ').join(''),
            Body: image.buffer,
        }

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
            }
        })



      
        foundUser.profilePicture = image.originalname.split(' ').join('');
        await foundUser.save();
        console.log('Success!');
        return res.json(foundUser);

    } catch (error) {
        console.log(error);
        res.status(500).json('Error! Please try again!');
    }


})

module.exports = router;