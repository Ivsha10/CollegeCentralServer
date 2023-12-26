const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

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
            Expires: 3600
        })

        return url;
    }

    const url =  getVideo();

    return res.json(url);

})


module.exports = router;