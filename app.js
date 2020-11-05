let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let interval;

io.on('connection', (socket) => {
    console.log('a user connected');
    
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('disconnect', () => {
        console.log('user has disconnected');
        clearInterval(interval);
    })
});

http.listen(3001, () => {
    console.log('server is running');
})

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit('clock', response);
}