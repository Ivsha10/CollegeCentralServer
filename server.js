const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const {ExpressPeerServer} = require('peer');

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

//app.use(cors({ origin: ['https://collegecentral.netlify.app', 'https://collegecentral2.netlify.app', `0.peerjs.com`], credentials: true })) 
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', '10.0.13.198:3000'], credentials: true }))

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


const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/peerserver'
})

app.use('/peerjs', peerServer);

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
         origin: ['http://localhost:3000', 'http://127.0.0.1:3000', `0.peerjs.com`], 
        //origin : ['https://collegecentral2.netlify.app', `0.peerjs.com`]
    }
})

const socketController = require('./controllers/socketController');

io.on('connection', socket => {

    console.log(`${socket.id} connected!\n`)
    socket.emit('connected', socket.id);

    socket.on('setUserId', async (userDbId) => {
        await socketController.setUserId(socket.id, userDbId);
    });



    socket.on('joinRoom', async (roomObj) => {
        await socketController.joinRoom(socket, roomObj);
    })



    socket.on('message', async ({ message, id }) => {

        await socketController.handleMessage(io, message, id);

    })

    socket.on('roomRefresh', (roomId) => {
        socketController.handleRoomRejoin(io, socket, roomId)
    })

    socket.on('activity', (data) => {
        socketController.handleActivity(socket, data);
    })

    socket.on('leave', (id) => {
        socket.leave(id);
        socket.emit('roomLeft', id);
    });

    //Video Chat listeners and emitters start

    socket.on('callUser', async (data) => {
        await socketController.handleCallUser(io, socket, data);
    })
    socket.on('callAccepted', (data) => {
        socketController.handleAnswerCall(io, data);
    })

    socket.on('declineCall',  async (data) => {
        await socketController.handleDeclineCall(io, data);
    })

    socket.on('endCall', (data)=> {
       socketController.handleEndCall(io, data)
    })


    //Video Chat listeners and emitters end


    socket.on('disconnect', () => {
        console.log(socket.id, 'Disconnected!\n');
    })
})