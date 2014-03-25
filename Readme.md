# REPL Client (rc)

REPL client with tab completion and history. A simple, npm installable alternative to netcat (nc) and socat.

## Install

    npm install -g repl-client

## Usage

    $ rc /tmp/repl/socket.io.sock

## Adding a REPL to your app.

To easily add a REPL to your Node.js app, use [replify](https://github.com/dshaw/replify).

## Compatibility

`repl-client` only works under node 0.10. Upgrade.

## Use cases

As a repl
```shell
rc /tmp/repl/hello.sock
hello> require('os').type()
'Linux'
```

Using `stdin` pipe
```shell
echo "require('os').type()" | rc /tmp/repl/hello.sock
hello> require('os').type()
'Linux'
hello> %
```

## Props

- Special thanks to @TooTallNate for all the work he's done in improving node's REPL.
- The starting point for this module was Nate's "full featured" REPL client: https://gist.github.com/2209310
- We have been using this at @Voxer and love it.

## License

(The MIT License)

Copyright (c) 2012-2014 Daniel D. Shaw, http://dshaw.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
