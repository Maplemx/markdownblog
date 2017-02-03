const fs = require('fs'),
      marked = require('marked');

const frame = require('../frame'),
      setting = require('../../../setting');

const breadcrumb = require('../item/breadcrumb');

function createBlog (path, noBreadcrumb, noUpdate) {
    let HTML = ``;
    if (!noBreadcrumb) {
        HTML += `
            <div class = "mdblog-breadcrumb">${ breadcrumb(path) }</div>
        `;
    }
    let blogStatus = fs.statSync(path);
    HTML += `
            <div class = "mdblog-markdown">
                ${ marked(fs.readFileSync(path).toString()) }
            `
    if (!noUpdate) {
        HTML += `
                    <div class = "mdblog-blog-info">
                        本文创建于：${ blogStatus.ctime }<br />更新于：${ blogStatus.atime }
                    </div>
                `;
    }
    HTML += `
            </div>
            `;
    return frame(
        setting.BLOG_NAME + ' | ' + path.replace(/^.+\//gm, '').split('.')[0],
        ['markdown.css'],
        HTML
        ,
        [],
        []
    );
}

module.exports = createBlog;