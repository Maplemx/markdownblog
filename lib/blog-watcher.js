const path = require('path'),
      chokidar = require('chokidar');

const pathAnalysis = require('./path-analysis'),
      blogGenerator = require('./blog-generator');

const setting = require('./setting');

function watchBlog (
    blogStorageDir = setting.blogStorageDir
) {
    let watcher = chokidar.watch(
        blogStorageDir,
        {
            ignored: /^[\/|\\]\./,
            persistent: true,
        }
    );

    watcher
    .on(
        'add',
        (path) => {
            blogGenerator.file(pathAnalysis.file(path, blogStorageDir));
        }
    )
    .on(
        'addDir',
        (path) => {
            blogGenerator.dir(pathAnalysis.dir(path, blogStorageDir));
        }
    );
}

exports.watch = watchBlog;