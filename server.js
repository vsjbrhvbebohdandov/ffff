const http = require('http');
const fs = require('fs');
const path = require('path');
const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected. id - ' + socket.id);
    socket.on('new_message', (message) => {
        io.emit('message', message);
    });
});

    const pathToIndex = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
    const pathToStyle =fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
    const pathToScript=fs.readFileSync(path.join(__dirname, 'static', 'script.js'));

const server = http.createServer((req, res) =>{
   switch(req.url){
    case '/': return res.end(pathToIndex);
    case '/script.js': return res.end(pathToScript);
    case '/style.css': return res.end(pathToStyle);
   }
   res.statusCode == 404;
   return res.end('Error 404')
});

server.listen(3000);