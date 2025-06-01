const http = require('http');
const fs = require('fs');
const path = require('path');



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


const {Server} = require('socket.io');
const io = new Server(server);




io.on('connection', (socket) => {
    console.log('a user connected. id - ' + socket.id);

    let userNickname = 'admin';
    let messages = await.db.getMessage();
    

    
socket.emit('all_message', message)

   socket.on('new_message', (message) => {
    db.addMessage(message, 1)
        io.emit('message', userNickname + ' : ' + message);
   });
});