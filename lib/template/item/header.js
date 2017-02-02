const fs = require('fs');

const setting = require('../../../setting');

const MAX_NAV_LEVEL = 1;

function createNav (path, navLevel) {
    if (navLevel > MAX_NAV_LEVEL) return ``;
    let files = fs.readdirSync(path),
        html = ``,
        liCount = 0;
    for (let i = 0; i < files.length; i++) {
        let file = files[i],
            fileStatus = fs.statSync(path + '/' + file);
        if (
                fileStatus.isDirectory()
                && !((path + '/' + file).replace(setting.BLOG_DIR, '') + '/').match(setting.BLOG_ATTACHEMENT_DIRS)
            ) {
            html += `
                <a herf = "${ setting.PATH_TO_URI(path + '/' + file) }>
                    //encodeURIComponent(path.replace(setting.BLOG_DIR, setting.BLOG_ROOT_URL) + '/' + file).replace(/\%2F/gm, '').replace('//','/')}">
                <li>
                    ${ file }
                    ${ createNav(path + '/' + file, navLevel + 1) }
                </li>
                </a>
            `;
            liCount++;
        }
    }
    if (liCount > 0) {
        html = `
            <ul class = "mdblog-nav-level-${ navLevel }">
                ${ html }
            </ul>    
        `
    }
    return html;
}

function createHeader () {
    return `
        <div class = "mdblog-header">${ setting.BLOG_NAME }</div>
        <div class = "mdblog-nav"> ${ createNav(setting.BLOG_DIR, 1) }</div>
    `;
}

module.exports = createHeader;