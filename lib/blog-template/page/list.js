const path = require('path');

const templateManager = require('../../blog-template-manager');

//Set Dependent Items
templateManager.setItem('header', path.resolve(__dirname, '../item/header'));
templateManager.setItem('breadcrumb', path.resolve(__dirname, '../item/breadcrumb'));
templateManager.setItem('list', path.resolve(__dirname, '../item/list'));
templateManager.setItem('footer', path.resolve(__dirname, '../item/footer'));

function createListPageContent (blogPage, blogInfo) {
    return `
        <div class = "mdb-main">
            ${ templateManager.getItem('breadcrumb')(blogPage, blogInfo) }
            ${ templateManager.getItem('list')(blogPage, blogInfo) }
        </div>
    `;
}

function createEmptyPage (blogInfo) {
    let blogPage = templateManager.getPageFrame(blogInfo.name);
    blogPage
       .setBody(`
            ${ templateManager.getItem('header')(blogPage, blogInfo) }
            ${ createListPageContent(blogPage,blogInfo) }
            ${ templateManager.getItem('footer')(blogPage, blogInfo) }
        `);
    return blogPage.return();
}

module.exports = createEmptyPage;