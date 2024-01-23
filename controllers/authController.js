const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleSignIn = async (req, res) => {
    const {username, password, deviceToken} = req.body;



    const foundUser = await User.findOne({username:username}).exec();
    if(foundUser) {
        const match = bcrypt.compareSync(password, foundUser.password);
        if(match) {

            const accessToken = jwt.sign({
                "UserInfo":{'username':foundUser.username}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'59m'}
            )

            const refreshToken = jwt.sign(
                {'username':foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )

            foundUser.refreshToken = refreshToken;
            const id = foundUser._id;
            const role = foundUser.role;
            const isOtp = foundUser.isOtp === undefined ? false : true;
            const deviceTokens = new Set(foundUser.deviceTokens);
            deviceTokens.add(deviceToken);

            foundUser.deviceTokens = [deviceToken];

            const result = foundUser.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1000 * 60 * 60 * 24 });
            res.json({'accessToken': accessToken, 'message':'Signed In Succesfully', 'role':role, "id":id, 'isOtp': isOtp /* 'sentFriendRequests': sentFriendRequests, 'receivedFriendRequests': receivedFriendRequests */});
            console.log('Signed In');
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
}

const handleChangePwd = async (req, res) => {

   const {id, currentPwd, newPwd} = req.body;

   const foundUser = await User.findById(id).exec();

   const match =  bcrypt.compareSync(currentPwd, foundUser.password);

   if(match) {

        foundUser.password = await bcrypt.hash(newPwd, 10);
        foundUser.isOtp = false;
        await foundUser.save();
        return res.sendStatus(200);
   } else {
        
         res.status(403).json('Unauthorized');

   }


}
module.exports = {handleSignIn, handleChangePwd};