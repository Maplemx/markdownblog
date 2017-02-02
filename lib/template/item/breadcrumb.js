const setting = require('../../../setting');

function createBreadcrumb (path) {
    var html = `▶︎　<a href = "/">首页</a>`,
        pathSplit = path.replace(setting.BLOG_DIR, '').split('/'),
        link = '',
        breadcrumbs = [];
    for (var i = 0; i < pathSplit.length; i++) {
        if (pathSplit[i]){ breadcrumbs.push(pathSplit[i]); }
    }

    for (var i = 0; i < breadcrumbs.length; i++) {
        html += ' - ';
        link += '/' + breadcrumbs[i].split('.')[0];
        html += `<a href = "${ link }">${ breadcrumbs[i].split('.')[0] }</a>`;
    }

    return html;
}

module.exports =createBreadcrumb;