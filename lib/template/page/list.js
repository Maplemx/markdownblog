const fs = require('fs');

const frame = require('../frame'),
      setting = require('../../../setting'),
      order = require('../../order');

const breadcrumb = require('../item/breadcrumb');

const blogJudge = new RegExp('\\\.' + setting.BLOG_PUBLISH_MARK + '\\\.md$'),
      draftJudge = new RegExp('[^.+\\\.' + setting.BLOG_PUBLISH_MARK + ']\\\.md$'),
      attachmentJudge = new RegExp(setting.BLOG_ATTACHEMENT_DIRS);

function createListByData (listData, isBlog) {
    let HTML = `
        <ul>
    `;
    for (let i = 0; i < listData.length; i++) {
        HTML += `<li><a href = "${ listData[i].uri }">${ listData[i].name }</a>`;
        if (isBlog) { HTML += `　<span class = "mdblog-list-blog-info">${ 1900 + listData[i].mtime.getYear() }-${ 1 + listData[i].mtime.getMonth() }-${ listData[i].mtime.getDate() }</span>`}
        HTML += `</li>`;
    }
    HTML += `
        </ul>
    `
    return HTML;
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
                let uri = setting.PATH_TO_URI(path + '/' + file);
                    //encodeURIComponent(path.replace(setting.BLOG_DIR, setting.BLOG_ROOT_URL) + '/' + file).replace(/\%2F/gm, '/').replace('//', '/');
                subList.push({
                    name: file.replace('+', '&nbps;'),
                    uri: uri,
                    ctime: fileStatus.ctime,
                    mtime: fileStatus.mtime,
                });

            }
        } else {
            if (blogJudge.test(path + '/' + file)) {
                let uri = setting.PATH_TO_URI(path + '/' + file.replace(/\..+/gm, ''));
                    //encodeURIComponent(path.replace(setting.BLOG_DIR, setting.BLOG_ROOT_URL) + '/' + file.replace(/\..+/gm, '')).replace(/\%2F/gm, '').replace('//', '/');
                blogList.push({
                    name: file.replace(/\..+/gm, ''),
                    uri: uri,
                    ctime: fileStatus.ctime,
                    mtime: fileStatus.mtime,
                });
            }
        }
    }

    subList = order(subList, [setting.SUB_LIST_ORDER], setting.SUB_LIST_ORDER_DESC);
    blogList = order(blogList, [setting.BLOG_LIST_ORDER], setting.BLOG_LIST_ORDER_DESC);

    if (subList.length == 0 && blogList.length == 1) {
        return {
            onlyBlog: blogList[0].name,
        }
    } else {
        let HTML = ``;
        if (subList.length > 0) {
            HTML += `
                        <div class = "mdblog-sub-list">
                            <h3>下级目录</h3>
                            ${ createListByData(subList) }
                        </div>
                    `;
        }
        if (blogList.length > 0) {
            HTML += `
                        <div class = "mdblog-blog-list">
                            <h3>本目录下文章</h3>
                            ${ createListByData(blogList, true) }
                        </div>
                    `;
        }
        return HTML;
    }
}

function createList (path) {
    let title = path.replace(setting.BLOG_DIR, '') ? path.replace(/.+\//gm, '') : '首页';
    let listHTML = createListHTML(path);
    if (listHTML.onlyBlog) {
        return require('./blog')(path + '/' + listHTML.onlyBlog + '.' + setting.BLOG_PUBLISH_MARK + '.md', true, true);
    } else {
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
}

module.exports = createList;