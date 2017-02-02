const fs = require('fs'),
      express = require('express'),
      chokidar = require('chokidar');

const setting = require('../setting'),
      pageGenerator = require('./generator');

const blogJudge = new RegExp('\\\.' + setting.BLOG_PUBLISH_MARK + '\\\.md$'),
      draftJudge = new RegExp('[^.+\\\.' + setting.BLOG_PUBLISH_MARK + ']\\\.md$'),
      attachmentJudge = new RegExp(setting.BLOG_ATTACHEMENT_DIRS);

let mdblog = express(),
    watcher = chokidar.watch(
                  setting.BLOG_DIR,
                  {
                    ignored: /[\/\\]\./,
                    persistent: true,
                  }
              );

function addBlogRouting (path) {
    let blogURL = encodeURIComponent(path.replace(setting.BLOG_DIR, '').replace(/\..+/gm, '')).replace(/\%2F/gm, '/');
    console.log('Add Blog Routing: ', blogURL);
    mdblog.get(
        blogURL,
        (req, res) => { res.send(pageGenerator.blog(path)); }
    );
}

function addAttachmentRouting (path) {
    let attachmentURL = encodeURIComponent(path.replace(setting.BLOG_DIR, '')).replace(/\%2F/gm, '/');
    console.log('Add Attachment Routing: ', attachmentURL);
    mdblog.get(
        attachmentURL,
        (req, res) => {
            let fileContent = fs.readFileSync(path);
            res.send(fileContent.toString());
        }
    );
}

function addListRouting (path) {
    let listURL = path.replace(setting.BLOG_DIR, '');
    listURL = listURL ? listURL : '/';
    listURL = encodeURIComponent(listURL).replace(/\%2F/gm, '/');
    console.log('Add List Routing: ', listURL);
    mdblog.get(
        listURL,  
        (req, res) => { res.send(pageGenerator.list(path)); }
    );
}

watcher
    .on(
        'add',
        (path) => {
            if (blogJudge.test(path)) {
                addBlogRouting(path);
            } else if (draftJudge.test(path)) {
                console.log('Ignore Draft: ', path.replace(setting.BLOG_DIR, ''));
            } else {
                addAttachmentRouting(path);
            }
        }
    )
    .on(
        'addDir',
        (path) => {
            if (!attachmentJudge.test(path + '/')) {
                addListRouting(path);
            }
        }
    );

pageGenerator.static(mdblog);

module.exports = mdblog;