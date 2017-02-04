exports.start = function () {
    const express = require('express'),
          app = express();

    const setting = require('./setting'),
          markdownblog = require('./lib/markdownblog');

    app.use(setting.BLOG_ROOT_URL, markdownblog);

    app.listen(setting.BLOG_PORT);
}

exports.app = require('./lib/markdownblog');