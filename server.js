'use strict';

let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    console.log('request for ' + pathname + ' recieved');
    route(handle, pathname);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log('ther server has started');
}

exports.start = start;