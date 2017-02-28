const path = require('path');

const setting = require('../../../setting');

function createFooter (pageFrame, data) {
    //Append Dependent Static Resource
    pageFrame.appendCSS('footer', path.resolve(__dirname, './css/footer.css'));

    return `
        <!-- Markdown Blog Footer -->
        <div class = "mdb-footer">
            THIS BLOG BELONGS TO <a href = "mailto:${ setting.blogOwnerEmail }">${ setting.blogOwner }</a>　POWERED BY <a href = "${ setting.markdownBlogNPM }">Markdown Blog ${ setting.markdownBlogVersion }</a>
        </div>
        <!-- Markdown Blog Footer -->
    `;
}

module.exports = createFooter;