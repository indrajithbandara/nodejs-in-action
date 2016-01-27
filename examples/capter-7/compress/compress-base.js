var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');
var app = connect()
.use(compression())
    .use(serveStatic('public'))
    .listen(3000);
