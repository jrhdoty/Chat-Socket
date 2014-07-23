var express  = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendfile('public/angular/index.html');
});

var server = app.listen(3000, function(){
  console.log('listening on 3000');
});