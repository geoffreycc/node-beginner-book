'use strict';
let fs = require('fs');
let formidable = require('formidable');

function start(res) {
  console.log('request handler start was called');
  let body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' + '</head>' + '<body>' + '<form action="/upload" enctype="multipart/form-data" method="post">' + '<input type="file" name="upload" multiple="multiple">' + '<input type="submit" value="Upload File" />' + '</form>' + '</body>' + '</html>';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('request handler upload was called');
  let form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function(error, fields, files) {
    console.log('parsing done');
    fs.rename(files.upload.path, '/tmp/test.jpg', function(error) {
      if(error) {
        fs.unlink('/tmp/test.jpg');
        fs.rename(files.upload.path, '/tmp/test.jpg');
      }
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('recieved image </br>');
    res.write('<img src="/show" />');
    res.end();
  });
}

function show(res) {
  console.log('request handler show was called');
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  fs.createReadStream('/tmp/test.jpg').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;