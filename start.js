const   express = require('express'),
        path = require('path'),
        app = express();

const   mdblog = require('./lib/mdblog');

app.use('/', mdblog);
app.listen(80);
