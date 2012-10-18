#!/usr/bin/env node

/*!
 * repl-client
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var net = require('net')
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

process.stdin.pipe(socket)
socket.pipe(process.stdout)

socket.on('connect', function () {
  process.stdin.resume()
  process.stdin.setRawMode(true)
})

socket.on('close', function done () {
  process.stdin.setRawMode(false)
  process.stdin.pause()
  socket.removeListener('close', done)
})

process.stdin.on('end', function () {
  socket.destroy()
  console.log()
})

process.stdin.on('data', function (buffer) {
  if (buffer.length === 1 && buffer[0] === 4) {
    process.stdin.emit('end')
  }
})