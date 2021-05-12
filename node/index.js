//node server which will handle socket io connections

//import socket.io which we will run on port 8000
// ye socket.io instance hai http ka, apne app ko http instance se attach krta hai
//const io = require('socket.io')(8000);
var express = require('express');
var app = express();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});

httpServer.listen(5500);

// for users
const users = {};

//ab hamne jo ye socket.io server run krra hai, ye listen krega incoming events ko

//io.on -> socket.io ka ek instance hai, jo socket connections ko isten krega,
// eg, satyam ne join kiya meet ne join kiya

// jab bhi ek particular connecytion ne join kiya, tab us particular connection 
//ke saath kya hona chahiye vo socket.on dekhega 

io.on('connection', socket => {
    //ye event agar milta hai, server ko, to ye callback run krega
    socket.on('new-user-joined', name => {
            //this fn is for, socket.on agar user defined bhej raha hai, to mei kya krunga
            //user ko dedo socket-id, usko equal krdo name ke
            user[socket.id] = name;
            //fer name chla jayega, users array mei
            socket.broadcast.emit('user-joined', name);
        })
        //agar chat mssg kisi ne bheja tab 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] })
    })
})