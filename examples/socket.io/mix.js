var replify = require('replify')
  , mix = require('mixture').mix('socket.io-clients')

var count = 5
  , clientId = 0

// socket.io-client instances
var client = mix.task('socket.io-client', { filename: 'client.js' })

for (var i = 0; i < count; i++) {
  client.fork({ args: [clientId++] })
}

replify('socket.io-clients-mix', mix)