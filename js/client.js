const socket = io('http://localhost:8000');

// const io = require("socket.io-client");
// const socket = io("http://api.localhost:8000", {
//     withCredentials: true,
//     extraHeaders: {
//         "my-custom-header": "abcd"
//     }
// });
// let $;
// $.get("http://localhost:8000", function(response) {
//     console.log("AJAX SUCCESSFUL");
//     document.write(JSON.stringify(response));
// })

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//creating append function
//position is either left or right
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
}


// this will broadcast message that someone joined 
const namee = prompt("Enter your name to join");
socket.emit('new-user-joined', namee);

//this will append the above thing in chat box
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})