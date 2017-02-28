const blogWatcher = require('./lib/blog-watcher'),
      pathAnalysis = require('./lib/path-analysis'),
      blogGenerator = require('./lib/blog-generator'),
      templateManager = require('./lib/blog-template-manager');

let setting = require('./lib/setting');

function start (
    blogStorageDir = __dirname + '/blogs'
) {
    const express = require('express'),
          app = express();

    if (setting.routingGlobalStatic) {blogGenerator.globalStatic();}

    blogWatcher.watch(blogStorageDir);

    app.use( setting.blogRootURI, setting.blogApp ).listen( setting.blogPort );
}

function getApp (
    blogStorageDir = __dirname + '/blogs'
) {
    if (setting.routingGlobalStatic) {blogGenerator.globalStatic();}

    blogWatcher.watch(blogStorageDir);

    return setting.blogApp;
}

function appendToApp (
    expressApp,
    blogStorageDir = __dirname + '/blogs'
) {
    if (setting.routingGlobalStatic) {blogGenerator.globalStatic();}

    blogWatcher.watch(blogStorageDir);

    expressApp.use( setting.blogRootURI, setting.blogApp );
}

function getSetting (attribute) {
    return setting[attribute];
}

module.exports = { start, getApp, appendToApp, getSetting, pathAnalysis, templateManager }