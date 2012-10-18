var replify = require('replify')
  , io = require('socket.io').listen(8888, function () { console.log('Socket.io listening on :8888') })
  , app = io

io.on('connection', function (socket) {
  socket.on('join', function (room) {
    console.log('args', arguments)
    console.log('Client request to join room %d', room)
    socket.join(room)
    socket.send('Welcome to room ' + room)
  })
})


replify('socket.io', app)
