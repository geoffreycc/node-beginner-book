'use strict';

let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    console.log('request for ' + pathname + ' recieved');

    req.setEncoding('utf8');

    req.addListener ('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('recieved POST data chunk ' + postDataChunk);
    });
    req.addListener('end', function() {
      route(handle, pathname, res, postData);
    });
  }
  http.createServer(onRequest).listen(8888);
  console.log('the server has started');
}

exports.start = start;