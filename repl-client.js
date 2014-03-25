#!/usr/bin/env node

/*!
 * repl-client
 * Copyright(c) 2012-2014 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var net = require('net')
  , stream = require('stream')
  , optimist = require('optimist')
  , options = optimist.options('p', { alias : 'path' }).argv

/**
 * Configuration
 */

if (!options.path) {
  if (!options._.length) {
    console.log(optimist.usage('Usage: $0 /tmp/repl/socket.io.sock').help())
    process.exit(1)
  } else {
    options.path =  options._[0]
  }
}

/**
 * REPL Client
 */

var socket = net.connect(options)

process.stdin
  .pipe(socket)
  .pipe(process.stdout)

process.stdin.on('data', function watchForEOT(buffer) {
  if (buffer.length === 1 && buffer[0] === 4) { // EOT (end-of-transmission) Ctrl-D
    console.log() // provide graceful line break
    process.stdin.emit('end')
  }
})

if (process.stdin.setRawMode) {
  socket.on('connect', function activateRawMode() {
    process.stdin.setRawMode(true)
  })
}
