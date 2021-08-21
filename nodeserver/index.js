const io =  require('socket.io')(8000)
const users= {};
io.on('connection',socket =>{
    socket.on('new-user-joined', named =>{
        console.log("new user", named);
        users[socket.id] = named;
        socket.broadcast.emit('user-joined',named);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', { message: message , named: users[socket.id] })
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    });
}) 