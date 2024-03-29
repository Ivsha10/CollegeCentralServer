const fs = require('fs');

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
const corsOptions = require('./config/corsOptions')
var firebaseAdmin = require("firebase-admin");

const serviceAccount = require('./config/collegecentralServiceAccount.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

connectDB();
// To connect to the database

//

app.use(credentials);

app.use(cors(corsOptions))


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
app.use('/verify', require('./routes/verify'));



app.use(verifyJWT);

app.use('/users', require('./routes/user'));
app.use('/colleges', require('./routes/college'));
app.use('/profile', require('./routes/profile'));
app.use('/checkout', require('./routes/checkout'));




mongoose.connection.once('open', () => {
    console.log(yellow, 'Connected to MongoDB');
})

//Websocekts!
const io = new Server(server, {
    cors: {
        origin: '*'

    }
})


server.listen(PORT, () => console.log(green, `Server running on port`, PORT));
// Starting the server!


const socketController = require('./controllers/socketController');
const College = require('./model/College');




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

        await socketController.handleMessage(io, message, id, firebaseAdmin);

    })

    socket.on('roomRefresh', (roomId) => {
        socketController.handleRoomRejoin(io, socket, roomId)
    })

    socket.on('rejoin', roomId => {
        socketController.handleRoomRejoin(io, socket, roomId)
    })

    socket.on('activity', (data) => {
        socketController.handleActivity(socket, data);
    })

    socket.on('leave', (id) => {
        socket.leave(id);
        socket.emit('roomLeft', id);
    });


    socket.on('getFriendProfile', async ({ friendId, myId }) => {
        await socketController.getUserProfile(socket, friendId, myId);
    })

    //Video Chat listeners and emitters start

    socket.on('callUser', async (data) => {
        await socketController.handleCallUser(io, socket, data);
    })
    socket.on('callAccepted', (data) => {
        socketController.handleAnswerCall(io, data);
    })

    socket.on('declineCall', async (data) => {
        await socketController.handleDeclineCall(io, data);
    })

    socket.on('endCall', (data) => {
        socketController.handleEndCall(io, data)
    })


    //Video Chat listeners and emitters end

    // Connections page listeners and emitters start


    socket.on('getUserSocials', async (id) => {
        await socketController.handleUserSocials(socket, id);
    })

    socket.on('friendRequest', async (data) => {
        await socketController.handleFriendRequest(io, socket, data, firebaseAdmin);
    })

    socket.on('acceptFriendRequest', async (data) => {
        await socketController.handleAcceptRequest(io, socket, data, firebaseAdmin);
    })



    socket.on('getModalInfo', async ({ id, myId }) => {
        await socketController.getModalInfo(socket, id, myId);
    })

    socket.on('updateInfo', async (data) => {
        await socketController.updateProfile(socket, data);
    })
    // Connections page listeners and emitters end

    //handling video update

    socket.on('tryToCheckout', () => {
        socket.emit('checkoutAllowed');
    })


    socket.on('disconnect', () => {
        console.log(socket.id, 'Disconnected!\n');
    })

    socket.on('starChat', async ({ id, chatId }) => {
        await socketController.starChat(socket, id, chatId);
    })

    socket.on('unstarChat', async ({ id, chatId }) => {
        await socketController.unstarChat(socket, id, chatId);
    })

})


/* require('./estimator/estimator').estimateScores(); */





