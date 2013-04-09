#!/usr/bin/env node

/*!
 * repl-client
 * Copyright(c) 2012-2013 Daniel D. Shaw <dshaw@dshaw.com>
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
  , streams2 = !!stream.Transform

process.stdin.pipe(socket, { end: false }).pipe(process.stdout)

function destroySocket () {
  socket.destroy()
  console.log()
}

process.stdin.on('end', destroySocket)

if (streams2) {

  socket.on('connect', function () {
    process.stdin.setRawMode(true)
  })

  socket.on('close', function () {
    process.stdin.setRawMode(false)
    process.exit()
  })

} else { // node < v0.10

  socket.on('connect', function () {
    process.stdin.resume()
    process.stdin.setRawMode(true)
  })

  socket.on('close', function done () {
    process.stdin.setRawMode(false)
    process.stdin.pause()
    socket.removeListener('close', done)
  })

  process.stdin.on('data', function (buffer) {
    if (buffer.length === 1 && buffer[0] === 4) {
      destroySocket()
    }
  })

}
