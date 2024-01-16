const User = require('../model/User');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAZOEMY2CS4XZSDE6Y',
    secretAccessKey: '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',
    region: 'us-east-1',
});


const s3 = new AWS.S3();

const handleNewUser = async (req, res) => {
    

    const {username, fullName, pwd, age}  = req.body;

    console.log('age:', age);

    const info = JSON.parse(req.body.info);
    const role = info.role;
    const image = req.file;

    const imageName = image.originalname;

    const duplicate = await User.findOne({username: username}).exec();
     if (duplicate) return res.status(409).json({'error': 'This username already exists!'});


    if(role === 'player') {
        const result = await User.create({
            'username': username, 
            'profilePicture': imageName,
            'password': await bcrypt.hash(pwd, 10),
            'fullName': fullName,
            'email': username,
            'role': role,
            'age': age,
            'playerProfile': {...info},
            'credits':0
        
        });

        const params = {
            Bucket: `collegecentralbucket/users/players/${username}`,
            Key: image.originalname,
            Body: image.buffer,
        }

        s3.upload(params, (err, data) => {
            if(err) {
                console.log(err);
            }
        })
        
    } else {
        const result = await User.create({
            'username': username, 
            'password': await bcrypt.hash(pwd, 10),
            'profilePicture': imageName,
            'fullName': fullName,
            'email': username,
            'role': role,
            'age':age,
            'coachProfile': {...info}
        });
        const params = {
            Bucket: `collegecentralbucket/users/coaches/${username}`,
            Key: image.originalname,
            Body: image.buffer,
        }

        s3.upload(params, (err, data) => {
            if(err) {
                console.log(err);
            }
        })
    } 


    
    console.log(`User ${username} registered successfully!`);
    return res.status(200).json({'message':'Registered Succesfully!'}); 
}

module.exports = {handleNewUser};