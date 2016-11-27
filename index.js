'use strict';

let server = require('./server.js');
let router = require('./router.js');

server.start(router.route);