const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const multer = require('multer');
const User = require('../model/User');

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
router.get('/', async (req, res)=> {
    
    const getVideo = () => {
        const url = s3.getSignedUrl('getObject', {
            Bucket: 'collegecentralbucket',
            Key: 'Demo.mp4',
            Expires: 3600000000
        })

        return url;
    }

    const url =  getVideo();

    return res.json(url);

})

router.post('/:id', upload.single('video'), async (req, res) => {
    console.log(req.file);
     const video = req.file;
    const foundUser = await User.findById(req.params.id).exec();

    const params = {
        Bucket: `collegecentralbucket/users/players/${foundUser.username}/video`,
        Key: video.originalname.split(' ').join(''),
        Body: video.buffer,
    }

    s3.upload(params, (err, data) => {
        if(err) {
            console.log(err);
        }
    })


    
    const videoURL = `https://collegecentralbucket.s3.amazonaws.com/users/players/${foundUser.username}/video/${video.originalname}`

    let playerProfile = foundUser.playerProfile;
    playerProfile = {...playerProfile, video: videoURL};
    foundUser.playerProfile = playerProfile;

    await foundUser.save();

    return res.json(foundUser);

})


module.exports = router;