var http = require('http');

var spawn = require('child_process').spawn;

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-type':'text/html'});

  var python = spawn('python', ['hello.py']);

  python.stdout.on('data', function(data) {
    res.end(data.toString());
  });


}).listen(8080);
