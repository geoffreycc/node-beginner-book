'use strict';

let http = require('http');
let url = require('url');

function start() {
  function onRequest(req, res) {
    let pathName = url.parse(req.url).pathName;
    console.log('request for ' + pathName + ' recieved');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log('ther server has started');
}

exports.start = start;