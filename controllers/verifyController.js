const bcrypt = require('bcrypt');
const User = require('../model/User');
const emailController = require('../controllers/emailController');

const sendVerificationCode = async (req, res) => {

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const { username } = req.body;

    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
        return res.sendStatus(403);
    }

    foundUser.password =  await bcrypt.hash(verificationCode.toString(), 10);
    foundUser.isOtp = true;

    await foundUser.save();

    return emailController.sendVerificationCode(username, foundUser.fullName, verificationCode, res)





}

const verifyAccount = async (req, res) => {

    const {username, code} = req.body;
    const foundUser = await User.findOne({username: username}).exec();

    const match = bcrypt.compareSync(code, foundUser.password);
    if(!match) {
        return res.sendStatus(403);
    } else {
        return res.sendStatus(200);
    }

}

module.exports = { sendVerificationCode, verifyAccount }