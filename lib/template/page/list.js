const fs = require('fs');

const frame = require('../frame'),
      setting = require('../../../setting');

const breadcrumb = require('../item/breadcrumb');

const blogJudge = new RegExp('\\\.' + setting.BLOG_PUBLISH_MARK + '\\\.md$'),
      draftJudge = new RegExp('[^.+\\\.' + setting.BLOG_PUBLISH_MARK + ']\\\.md$'),
      attachmentJudge = new RegExp(setting.BLOG_ATTACHEMENT_DIRS);

function createListByData (listData) {
    let html = `
        <ul>
    `;
    for (let i = 0; i < listData.length; i++) {
        html += `
            <li><a href = "${ listData[i].uri }">${ listData[i].name }</a></li>
        `;
    }
    html += `
        </ul>
    `
    return html;
};

function createListHTML (path) {
    let subList = [],
        blogList = [];

    let files = fs.readdirSync(path);
    for (let i = 0; i < files.length; i++) {
        let file = files[i],
            fileStatus = fs.statSync(path + '/' + file);
        if (fileStatus.isDirectory()) {
            if (!attachmentJudge.test(path + '/' + file + '/')) {
                let uri = encodeURIComponent(path.replace(setting.BLOG_DIR, '') + '/' + file).replace(/\%2F/gm, '/');
                subList.push({
                    name: file,
                    uri: uri,
                });
            }
        } else {
            if (blogJudge.test(path + '/' + file)) {
                let uri = encodeURIComponent(path.replace(setting.BLOG_DIR, '') + '/' + file.replace(/\..+/gm, '')).replace(/\%2F/gm, '');
                blogList.push({
                    name: file.replace(/\..+/gm, ''),
                    uri: uri,
                });
            }
        }
    }
    return `
        <div class = "mdblog-sub-list">
            <h3>下级目录</h3>
            ${ createListByData(subList) }
        </div>
        <div class = "mdblog-blog-list">
            <h3>本目录下文章</h3>
            ${ createListByData(blogList) }
        </div>
    `;
}

function createList (path) {
    let title = path.replace(setting.BLOG_DIR, '') ? path.replace(/.+\//gm, '') : '首页';
    return frame(
        setting.BLOG_NAME + ' | ' + title,
        [],
        `
            <div class = "mdblog-breadcrumb">
                ${ breadcrumb(path) }
            </div>
            ${ createListHTML(path) }
        `,
        [],
        []
    );
}

module.exports = createList;