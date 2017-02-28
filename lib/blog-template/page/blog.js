const path = require('path');

const templateManager = require('../../blog-template-manager');

//Set Dependent Items
templateManager.setItem('header', path.resolve(__dirname, '../item/header'));
templateManager.setItem('breadcrumb', path.resolve(__dirname, '../item/breadcrumb'));
templateManager.setItem('markdownContainer', path.resolve(__dirname, '../item/markdown-container'));
templateManager.setItem('blogInfoBar', path.resolve(__dirname, '../item/blog-info-bar')); 
templateManager.setItem('footer', path.resolve(__dirname, '../item/footer'));

function createBlogPageContent (blogPage, blogInfo, isOnlyBlog) {
    return `
        <div class = "mdb-main">
            ${ templateManager.getItem('breadcrumb')(blogPage, blogInfo, isOnlyBlog) }
            ${ templateManager.getItem('markdownContainer')(blogPage, blogInfo) }
            ${ templateManager.getItem('blogInfoBar')(blogPage, blogInfo) }
        </div>
    `;
}

function createBlogPage (blogInfo, isOnlyBlog) {
    let blogPage = templateManager.getPageFrame(blogInfo.name);
    blogPage
       .setBody(`
            ${ templateManager.getItem('header')(blogPage, blogInfo) }
            ${ createBlogPageContent(blogPage, blogInfo, isOnlyBlog) }
            ${ templateManager.getItem('footer')(blogPage, blogInfo) }
        `);
    return blogPage.return();
}

module.exports = createBlogPage;