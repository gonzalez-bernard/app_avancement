// fichier communication côté client

var socket = io();

socket.on('welcome', function (msg) {
    console.log(JSON.parse(msg).titre)
});

socket.emit('welcome_ok', 'Salut')
