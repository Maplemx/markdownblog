exports.start = function () {
    const express = require('express'),
          app = express();

    const setting = require('./setting'),
          mdblog = require('./lib/mdblog');

    app.use(setting.BLOG_ROOT_URL, mdblog);

    app.listen(setting.BLOG_PORT);
}

exports.app = require('./lib/mdblog');