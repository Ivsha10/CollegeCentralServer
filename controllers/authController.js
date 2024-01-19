const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleSignIn = async (req, res) => {
    const {username, password, deviceToken} = req.body;

    console.log(req.body);


    const foundUser = await User.findOne({username:username}).exec();
    if(foundUser) {
        const match = bcrypt.compareSync(password, foundUser.password);
        if(match) {

            const accessToken = jwt.sign({
                "UserInfo":{'username':foundUser.username}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
            )

            const refreshToken = jwt.sign(
                {'username':foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )

            foundUser.refreshToken = refreshToken;
            const id = foundUser._id;
            const role = foundUser.role;
            const deviceTokens = new Set(foundUser.deviceTokens);
            deviceTokens.add(deviceToken);

            foundUser.deviceTokens = [deviceToken];

            const result = foundUser.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1000 * 60 * 60 * 24 });
            res.json({'accessToken': accessToken, 'message':'Signed In Succesfully', 'role':role, "id":id, /* 'sentFriendRequests': sentFriendRequests, 'receivedFriendRequests': receivedFriendRequests */});
            console.log('Signed In');
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
}

module.exports = {handleSignIn};