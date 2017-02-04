const setting = require('../../../setting');

function createFooter () {
    return `
        THIS BLOG BELONGS TO <a href = "mailto:${ setting.BLOG_OWNER_EMAIL }">${ setting.BLOG_OWNER }</a>　POWERED BY <a href = "https://www.npmjs.com/package/mdblog">MARKDOWNBLOG</a> ${ setting.VERSION }
    `;
}

module.exports = createFooter;