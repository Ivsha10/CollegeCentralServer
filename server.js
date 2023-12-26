const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = 3500;
const yellow = "\x1b[33m";
const green = "\x1b[32m";
const red = "\x1b[31m";

const ChatRoom = require('./model/ChatRoom');

connectDB();
// To connect to the database



app.use(credentials);

app.use(cors({ origin: ['https://collegecentral.netlify.app', 'https://collegecentral2.netlify.app'], credentials: true })) 
//app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', '10.0.13.198:3000'], credentials: true }))

//TO handle CORS ----> See Readme for Explanation of CORS

app.use(express.urlencoded({ extended: false }));
//To handle Form data ---> This will be important as we will need to send form data such as username, password, pictures etc

app.use(express.json());
//To handle simple JSON data ----> See Readme for explanation of JSON
app.use('/images', express.static('images'));

// To serve simple static files like css, images, etc

app.use(cookieParser());
// To handle cookie requests
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));

app.use(verifyJWT);
app.use('/users', require('./routes/user'));
app.use('/college', require('./routes/college'));
app.use('/profile', require('./routes/profile'));


const estimator = require('./estimator/estimator');
const User = require('./model/User');


/* estimator.estimateScores();

setInterval(() => {
    estimator.estimateScores();
}, 1000 * 60 * 60)
 */
mongoose.connection.once('open', () => {
    console.log(yellow, 'Connected to MongoDB');
})



server.listen(PORT, () => console.log(green, `CONNECTION ESTABLISHED!`));
// Starting the server!

//Websocekts!
const io = new Server(server, {
    cors: {
        origin: ['https://collegecentral2.netlify.app']
    }
})


io.on('connection', socket => {

    socket.on('welcome', async (members) => {


    })
    let ID;
    socket.on('room', async ({ user, members }) => {

        let query = { members: { $all: members } };
        let foundChat = await ChatRoom.findOne(query).exec();
        if (!foundChat) {

            //Crete a new chat
            console.log('NEW CHAT CREATED');
            foundChat = new ChatRoom({
                members: members,
                messages: []
            });

            await foundChat.save();
        }

        const id = foundChat.id;
        ID = id;
        const messages = foundChat.messages;
        const friend1 = await User.findById(members[0]);
        const friend2 = await User.findById(members[1]);

        let friends = [friend1.username, friend2.username];
        if (id) {
            socket.emit('welcome', { id, messages, friends });
        } else {
            console.log('no')
        }
        socket.join(id);
        console.log(`${user} joined the room ${id}`)
    })

    socket.on('message', async ({ message, id }) => {

        let foundChat = await ChatRoom.findById(id);

        let time = new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(new Date());
        let from = message.from;
        let content = message.message;
        let newMSg = {
            from: from,
            message: content,
            time: time
        }
        message = newMSg;
        io.to(id).emit('message', { message });
        socket.broadcast.emit('notification', { message });
        foundChat.messages.push({ ...message, time });
        await foundChat.save();
        console.log(message);
    })

    socket.on('activity', (data) => {
        if (data === true) socket.broadcast.to(ID).emit('activity', 'Typing...')
        else socket.broadcast.to(ID).emit('activity', '');
    })

    socket.on('leave', (id) => {
        console.log('LEFT');
    });

    socket.on('disconnect', () => {
        console.log(socket.id);
    })
})