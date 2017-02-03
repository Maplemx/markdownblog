const fs = require('fs');

const setting = require('../../../setting'),
      order = require('../../order');

const MAX_NAV_LEVEL = 1;

function createNav (path, navLevel) {
    if (navLevel > MAX_NAV_LEVEL) return ``;
    let files = fs.readdirSync(path),
        html = ``,
        liCount = 0,
        pubFiles = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i],
            fileStatus = fs.statSync(path + '/' + file);
        if (
                fileStatus.isDirectory()
                && !((path + '/' + file).replace(setting.BLOG_DIR, '') + '/').match(setting.BLOG_ATTACHEMENT_DIRS)
            ) {
            pubFiles.push({
                name: file,
                uri: setting.PATH_TO_URI(path + '/' + file),
                ctime: fileStatus.ctime,
                mtime: fileStatus.mtime,
            });
            liCount++;
        }
    }
    pubFiles = order(pubFiles, [setting.SUB_LIST_ORDER], setting.SUB_LIST_ORDER_DESC);

    for (let i = 0; i < pubFiles.length; i++) {
        html += `
                <a href = "${ setting.PATH_TO_URI(path + '/' + pubFiles[i].name) }">                    
                    <li>
                        ${ pubFiles[i].name }
                    </li>
                </a>
                ${ createNav(path + '/' + pubFiles[i].name, navLevel + 1) }
            `;
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
        <div class = "mdblog-logo">
            <a href = "${ setting.PATH_TO_URI(setting.BLOG_ROOT_URL) }">
                ${ setting.BLOG_NAME }
            </a>
        </div>
        <div class = "mdblog-nav"> ${ createNav(setting.BLOG_DIR, 1) }</div>
    `;
}

module.exports = createHeader;