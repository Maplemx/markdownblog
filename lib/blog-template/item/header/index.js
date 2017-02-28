const path = require('path'),
      fs = require('fs');

const setting = require('../../../setting'),
      pathAnalysis = require('../../../path-analysis');

function createHeadNav (blogStorageDir) {
    let navInfo = [];

    let files = fs.readdirSync(blogStorageDir);
    for (let i = 0; i < files.length; i++) {
        let file = files[i],
            fileStatus = fs.statSync(blogStorageDir + '/' + file);
        if (fileStatus.isDirectory()) {
            let dirInfo = pathAnalysis.dir(blogStorageDir + '/' + file, blogStorageDir);
            if (dirInfo.type == 'list') { navInfo.push(dirInfo); }
        }
    }

    navInfo.sort(
        (firstItem, secondItem) => {
            return firstItem.order - secondItem.order;
        }
    )

    let html = `<ul>`;
    for (let i = 0; i < navInfo.length; i++) {
        html += `<a href = "${ navInfo[i].URI }"><li>${ navInfo[i].name }</li></a>`
    }
    html += `</ul>`;

    return html;
}

function createHeader (pageFrame, data) {
    //Append Dependent Static Resource
    pageFrame.appendCSS('header', path.resolve(__dirname, './css/header.css'));

    return `
        <!-- Markdown Blog Header -->
        <div class = "mdb-header">
            <div class = "mdb-header-warper">
                <a href = "${ setting.blogRootURI }"><div class = "mdb-logo">${ setting.blogName }</div></a>
                <div class = "mdb-head-nav">
                    ${ createHeadNav(data.blogStorageDir) }
                </div>
            </div>
        </div>
        <!-- Markdown Blog Header -->
    `;
}


module.exports = createHeader;