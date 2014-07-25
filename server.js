var express  = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = Number(process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
// app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendfile('public/angular/index.html');
});

io.on('connection', function(socket){
  socket.on('message:send', function(msg){
    console.log('message: ' + msg.message);
    io.emit('message:get', msg);
  });
});


var server = http.listen(port, function(){
  console.log('listening on 3000');
});