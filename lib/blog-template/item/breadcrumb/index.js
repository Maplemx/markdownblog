const path = require('path');

const setting = require('../../../setting'),
      formatURI = require('../../../format-uri');

function createBreadcrumbContent (data, isOnlyBlog) {
    let html = `▶︎ <a href = "${ formatURI(setting.blogRootURI) }">首页</a>`,
        pathSplit = data.path.replace(data.blogStorageDir, '').split('/'),
        link = '',
        breadcrumbs = [],
        breadcrumbsCount;

    for (let i = 0; i < pathSplit.length; i++) {
        if (pathSplit[i]) { breadcrumbs.push(pathSplit[i]); }
    }

    for (let i = 0; i < breadcrumbs.length; i++) {
        let linkPart = formatURI(setting.blogRootURI + '/' + breadcrumbs[i].split('.')[0]),
            partName = decodeURIComponent(linkPart).replace('/', '');
        link += linkPart;
        if (isOnlyBlog) {
            if (partName !== '首页' && i < (breadcrumbs.length - 1)) {
                html += ` - <a href = "${ link }">${ decodeURIComponent(linkPart).replace('/', '') }</a>`;
            }
            break;
        } else {
            html += ` - <a href = "${ link }">${ decodeURIComponent(linkPart).replace('/', '') }</a>`;
            break;
        }
    }

    return html;
}

function createBreadcrumb (pageFrame, data, isOnlyBlog) {
    pageFrame.appendCSS('breadcrumb', path.resolve(__dirname, './css/breadcrumb.css'));
    return `
        <!-- Markdown Blog Breadcrumb -->
        <div class = "mdb-breadcrumb">
            ${ createBreadcrumbContent(data, isOnlyBlog) }
        </div>
        <!-- Markdown Blog Breadcrumb -->
    `
}

module.exports = createBreadcrumb;