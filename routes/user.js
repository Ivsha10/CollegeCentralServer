const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

const upload = multer({ dest: 'images/userImages' });

router.get('/', async (req, res) => {

    const username = req.query.param;
    const foundUser = await User.findOne({ username: username }).exec();
    res.json({
        'username': foundUser.username,
        'fullName': foundUser.fullName,
        'email': foundUser.email,
        'photo': foundUser.image,
    });
})

router.get('/all', async (req, res) => {
    const users = await User.find().exec();
    const filteredUsers = [];
    users.forEach((user) => {
        const username = user.username;
        const roles = user.roles;
        const id = user.id;
        filteredUsers.push({ id, username, roles });
    })

    res.json(filteredUsers);
})

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

router.delete('/:id', async (req, res) => {
    const id = req?.params?.id;
    const result = await User.findByIdAndDelete(id).exec();
    const users = await User.find().exec();
    const filteredUsers = [];
    users.forEach((user) => {
        const username = user.username;
        const roles = user.roles;
        const id = user.id;
        filteredUsers.push({ id, username, roles });
    })
    res.json(filteredUsers);
});


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

router.put('/:user', async (req, res) => {
    
    const username  = req.params.user;
    const invoice = req.body;
    const hashedCreditCard = await bcrypt.hash(invoice.creditCard, 10);
    invoice.creditCard = hashedCreditCard;
    const foundUser = await User.findOne({username: username}).exec();
    foundUser.invoices.push(invoice);
    const result= await foundUser.save();
    
    res.sendStatus(200);
    
});

module.exports = router;