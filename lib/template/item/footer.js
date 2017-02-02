const setting = require('../../../setting');

function createFooter () {
    return `
        THIS BLOG BELONGS TO <a href = "mailto:${ setting.BLOG_OWNER_EMAIL }">${ setting.BLOG_OWNER }</a><br />
        POWERED BY <a href = "https://www.npmjs.com/package/mdblog">MDBLOG</a>
    `;
}

module.exports = createFooter;