const fs = require('fs'),
      markdown = require('markdown').markdown;

const frame = require('../frame'),
      setting = require('../../../setting');

const breadcrumb = require('../item/breadcrumb');

function createBlog (path) {
    return frame(
        setting.BLOG_NAME + ' | ' + path.replace(/^.+\//gm, '').split('.')[0],
        [],
        `
            <div class = "mdblog-breadcrumb">${ breadcrumb(path) }</div>
            <dic class = "mdblog-markdown">
                ${ markdown.toHTML(fs.readFileSync(path).toString()) }
            </div>
        `,
        [],
        []
    );
}

module.exports = createBlog;