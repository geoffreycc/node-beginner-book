'use strict';

let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let postData = '';
    let pathname = url.parse(req.url).pathname;
    console.log('request for ' + pathname + ' recieved');
    res.setEncoding('utf-8');
    res.addListener ('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('recieved POST data chunk ' + postDataChunk);
    });
    res.addListener('end', function() {
      route(handle, pathname, res, postData);
    });
  }
  http.createServer(onRequest).listen(8888);
  console.log('ther server has started');
}

exports.start = start;