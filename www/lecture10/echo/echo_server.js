var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/echo_client.html');

});

io.on('connection', function(socket) {
    socket.on('outgoing', function(msg) {
       console.log('outgoing: ' + msg);
        io.emit('echo', msg);
    });

    socket.on('disconnect', function() {
       console.log('a client disconnected');
    });
});

// starts the HTTP server listening on port 2000
http.listen(2000, function() {
    console.log('listening on *:2000');
});

// this is an event handler that catches the CTRL-C event (SIGINT) and
// performs a graceful shutdown of node.js
process.on( 'SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit();
});
