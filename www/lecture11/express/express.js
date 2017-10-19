var express = require('express');

app = express();

app.get('/', function(req, res) {
  res.send('You GOT!');
});

app.get('/foo', function(req, res) {
  res.send('Foo to you, too, man.');
});

app.post('/', function(req, res) {
  res.send("Posted to /");
});

app.put('/put-test', function(req, res) {
  res.send("Putted!");
});

app.delete('/del-test', function(req, res) {
  res.send('Deleted!');
});

app.listen(9090, function() {
  console.log("Listening for incoming connections on 9090...");
});
