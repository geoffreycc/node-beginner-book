'use strict';

let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    console.log('request for ' + pathname + ' recieved');
    route(handle, pathname, res, req);
  }
  http.createServer(onRequest).listen(8888);
  console.log('the server has started');
}

exports.start = start;