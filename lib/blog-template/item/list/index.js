const fs = require('fs'),
      path = require('path');

const pathAnalysis = require('../../../path-analysis');

function createListContent (data) {
    let dirList = [],
        blogList = [];

    let files = fs.readdirSync(data.path);
    for (let i = 0; i < files.length; i++) {
        let file = files[i],
            fileStatus = fs.statSync(data.path + '/' + file);
        if (fileStatus.isDirectory()) {
            let dirInfo = pathAnalysis.dir(data.path + '/' + file, data.blogStorageDir);
            if (dirInfo.type == 'list') { dirList.push(dirInfo); }
        } else {
            let blogInfo = pathAnalysis.file(data.path + '/' + file, data.blogStorageDir);
            if (blogInfo.type == 'blog') { blogList.push(blogInfo); }
        }
    }

    let html = ``;
    if (dirList.length > 0) {
        dirList.sort(
            (firstItem, secondItem) => {
                return firstItem.order - secondItem.order;
            }
        )
        html += `
            <p>下级目录：</p>
            <ul>
        `;
        for (let i = 0; i < dirList.length; i++) {
            html += `
                <li><a href = "${ dirList[i].URI }">　${ dirList[i].name }</a></li>
            `;
        }
        html += `
            </ul>
        `;
    }
    if (blogList.length > 0) {
        blogList.sort(
            (firstItem, secondItem) => {
                return secondItem.order - firstItem.order;
            }
        )
        html += `
            <p>文章列表：</p>
            <ul>
        `;
        for (let i = 0; i < blogList.length; i++) {
            html += `
                <li><a href = "${ blogList[i].URI }">　${ blogList[i].name }</a></li>
            `;
        }
        html += `
            </ul>
        `;
    }

    return html;
}

function createList (pageFrame, data) {
    pageFrame.appendCSS('list', path.resolve(__dirname, './css/list.css'));
    return `
        <!-- Markdown Blog List -->
        <div class = "mdb-list">
            ${ createListContent(data) }
        </div>
        <!-- Markdown Blog List -->
    `;
}

module.exports = createList;