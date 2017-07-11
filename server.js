var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
app.use(express.static("./static"));

var counter = 0;
app.get('/', function(req, res) {
  res.render("button", {count:counter});
})
app.use(express.static(path.join(__dirname, './views')));
app.use(express.static(path.join(__dirname, './node_modules/jquery/dist')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server  = app.listen(8000, function() {
 console. log( "listening on port 8000");
});

var socketServer = require('socket.io');
var io = socketServer.listen(server);

io.sockets.on('connection', function(socket){
  console.log("Someone has connected");
  socket.on('btn_counter_clicked', function(){
    counter ++;
    io.sockets.emit('count_incremented', {count: counter});
  })
  socket.on('reset_button_clicked', function(){
    counter = 0;
    io.sockets.emit('reset_the_count')
  })
})
