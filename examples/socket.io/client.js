var client = require('socket.io-client')
  , replify = require('replify')

var cid = process.argv[2] || 'x'
  , socket = client.connect('http://localhost:8888')

socket.on('connect', function () {
  console.log('client %d connected', cid)
  socket.emit('join', cid)
})

replify('socket.io-client_'+cid, socket)
