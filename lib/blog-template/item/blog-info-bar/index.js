const fs = require('fs'),
      path = require('path');

function createBlogInfoBar (pageFrame, data, isOnlyBlog) {
    pageFrame.appendCSS('blog-info-bar', path.resolve(__dirname, './css/blog-info-bar.css'));

    let blogStatus = fs.statSync(data.path);

    if (isOnlyBlog) {
        return ``;
    } else {
        return `
            <!-- Markdown Blog Info Bar -->
            <div class = "mdb-blog-info-bar">
                本文创建于：${ blogStatus.ctime }<br />
                更新于：${ blogStatus.atime }
            </div>
            <!-- Markdown Blog Info Bar -->
        `;
    }
}

module.exports = createBlogInfoBar;