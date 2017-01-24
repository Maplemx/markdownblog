const fs = require('fs'),
      express = require('express'),
      chokidar = require('chokidar'),
      markdown = require('markdown').markdown,
      setting = require('../setting');

var mdblog = express(),
    watcher = chokidar.watch(
                  setting.BLOGPATH,
                  {
                      ignored: /[\/\\]\./,
                      persistent: true,
                  }
              );


function createPage (page) {
    return `
        <!DOCTYPE html>
        <html lang="zh-CN">
            <head>
                <title>${ page.title }</title>
                <meta charset="utf-8" />
                <style type="text/css">
                    ${ page.css }
                </style>
            </head>
            <body>
                ${ page.body }
                <script type="text/javascript">
                    ${ page.script }
                </script>
            </body>
        </html>
    `;
}

function createLogo () {
    return `
        ${ setting.BLOGNAME }
    `;
};

function createNav () {
    var files = fs.readdirSync(setting.BLOGPATH),
        html = '<ul>';

    for (var i = 0; i < files.length; i++) {
        var file = files[i],
            fileStatus = fs.statSync(setting.BLOGPATH + '/' + file);
        if (fileStatus.isDirectory()) {
            html += `
                <a href="/${ encodeURIComponent(file).replace(/\%2F/gm, '/') }/">
                    <li>${ file }</li>
                </a>
            `;
        }
    }

    html += '</ul>';
    return html;
}

function createBreadcrumb (path) {
    var html = '▶︎　<a href = "/">首页</a>',
        pathSplit = path.split('/'),
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

function createTail () {
    return `THIS BLOG IS MANAGED WITH MDBlog DEVELOPED BY <a href="mailto:maplemx@gmail.com">Maplemx</a>`;
}

function createList (path) {
    var files = fs.readdirSync(setting.BLOGPATH + path),
        html = '<ul class = "root-list">',
        categoryListHtml = `
            下级分类：
            <ul class = "category-list">
        `,
        blogListHtml = `
            博文：
            <ul class = "blog-list">
        `;

    for (var i = 0; i < files.length; i++) {
        var file = files[i],
            fileStatus = fs.statSync(setting.BLOGPATH + path + file);
        if (fileStatus.isDirectory()) {
            categoryListHtml += `
                <a href = "${ path }${ encodeURIComponent(file).replace(/\%2F/gm, '/') }">
                    <li>${ file }</li>
                </a>
            `;
        } else {
            blogListHtml += `
                <a href = "${ path }${ encodeURIComponent(file.split('.')[0]).replace(/\%2F/gm, '/') }">
                    <li>${ file.split('.')[0] }</li>
                </a>
            `
        }
    }

    categoryListHtml += '</ul>';
    blogListHtml += '</ul>';
    html += categoryListHtml + blogListHtml + '</ul>';
    return html;
}

function createBodyFrame (innerHTML) {
    return `
            <div class = "header">
                <div class = "logo">
                    ${ createLogo() }
                </div>
                <div class = "nav">
                    ${ createNav() }
                </div>
            </div>
            <div class = "main">
                ${ innerHTML }
            </div>
            <div class = "tail">
                ${ createTail() }
            </div>
        `;
}

function responseList (path) {
    var category = path.split('/');
    category = category[category.length - 1];
    return createPage({
        title: category,
        css: 
            `
            `,
        body: createBodyFrame(
                `
                    <div class = "breadcrumb">
                        ${ createBreadcrumb(path) }
                    </div>
                    <div class = "list-title">
                        ${ category }
                    </div>
                    <div class = "list-content">
                        ${ createList(path) }
                    </div>
                `
            ),
        script:
            `
            `,
    });
}    

function responseBlog (path) {
    var blogTitle = path.split('/');
    blogTitle = blogTitle[blogTitle.length - 1].split('.')[0];
    try {
        var blogData = fs.readFileSync(setting.BLOGPATH + path);
    } catch (e) {
        return responseEmpty();
    }
    return createPage({
        title: blogTitle,
        css: 
            `
            `,
        body: createBodyFrame(`
                <div class = "breadcrumb">
                    ${ createBreadcrumb(path) }
                </div>
                <div class = "blog-title">
                    ${ blogTitle }
                </div>
                <div class = "blog-content">
                    ${ markdown.toHTML(blogData.toString()) }
                </div>
            `),
        script:
            `
            `,
    });
}

function responseEmpty () {
    return createPage({
        title: 'PAGE NOT FOUND',
        css:
            `
            `,
        body:
            `
                PAGE NOT FOUND!
            `,
        script:
            `
            `,
    });
}

function addBlog (path) {
    console.log('Routing Blog: ' + encodeURIComponent(path.split('.')[0]).replace(/\%2F/gm, '/'));
    mdblog.get(
        encodeURIComponent(path.split('.')[0]).replace(/\%2F/gm, '/'),
        function (req, res) {
            res.send(responseBlog(path));
        }
    );
}

function addCategory (path) {
    console.log('Routing Category: ' + encodeURIComponent(path).replace(/\%2F/gm, '/'));
    mdblog.get(
        encodeURIComponent(path).replace(/\%2F/gm, '/'),
        function (req, res) {
            res.send(responseList(path));
        }
    );
}

watcher
    .on('add', function (path) {
        addBlog((path.replace(setting.BLOGPATH, '')));
    })
    .on('addDir', function (path) {
        addCategory((path.replace(setting.BLOGPATH, '') + '/'));
    });

module.exports = mdblog;