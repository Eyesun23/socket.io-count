var socket = io.connect();
var btn = document.getElementById('count');
var h1 = document.getElementsByTagName('h1')[0];
var reset = document.getElementsByClassName('reset')[0];

console.log(btn.innerHTML);

btn.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('button has been clicked');
  socket.emit('btn_counter_clicked');

})
socket.on('count_incremented', function(data) {
  console.log("count has been incremented", data.count);
  h1.innerText = data.count;
})

reset.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('reset_button_clicked');

})

socket.on('reset_the_count', function(data) {
  h1.innerText = 0;
})
