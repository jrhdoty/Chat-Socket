var express  = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
// app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendfile('public/angular/index.html');
});

io.on('connection', function(socket){
  socket.on('message:post', function(msg){
    console.log('message: ' + msg);
  });
});

var server = http.listen(3000, function(){
  console.log('listening on 3000');
});